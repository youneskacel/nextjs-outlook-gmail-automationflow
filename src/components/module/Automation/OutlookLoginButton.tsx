import React,{useState,useEffect} from 'react'
import { Flex,Text,Divider,Spinner,Button,Select } from '@chakra-ui/react';
import axios from 'axios'
import { useMsal } from '@azure/msal-react';
import { PublicClientApplication, EventType,IPublicClientApplication,InteractionRequiredAuthError } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { AccountInfo } from '@azure/msal-browser';






const LoginButton = ({setContacts,setTargetMail} : {setContacts : React.Dispatch<any>, setTargetMail : React.Dispatch<string|null>}) => {
    const { instance, accounts } = useMsal();
    const [account,setAccount] = useState<AccountInfo |null>(null)
    const [loading , setLoading] = useState<boolean>(false)
    const [accessToken,setAccessToken] = useState<string|null>(null)
    
   
    const login = async () => {
        try {
            if(accounts && instance.getActiveAccount()){
                instance.setActiveAccount(null)
                
            }
          const res = await instance.loginPopup({scopes : ['openid','user.read','mail.read','offline_access'],redirectUri:'http://localhost:3000/'})
          setAccessToken(res.accessToken)
        } catch (error) {
            
        }
    }
    
    const logout = async () => {
        instance.logoutPopup()
    }


   
    const getContacts = async (token:string) => {
        try {
            const {data} = await axios.post('/api/outlookAuth',{token})
            setContacts(data)
        } catch (error) {
            console.log(error)
        }
    }

    const renewToken =async () => {
        const account = instance.getActiveAccount() 
        const scopes = process.env.NEXT_PUBLIC_OUTLOOK_SCOPES
        try {
            if(account){
                const {accessToken}  = await instance.acquireTokenPopup({account,scopes : scopes ? scopes?.split(' '): [],redirectUri : 'http://localhost:3000/'})
                setAccessToken(accessToken)
            }
        } catch (error) {
            
        }
    }

    useEffect(()=>{
            const account = instance.getActiveAccount()
            setAccount(account)
            // eslint-disable-next-line
    },[accounts])
    

   useEffect(()=>{
    if(accessToken){
        getContacts(accessToken)
    }
    // eslint-disable-next-line
   },[accessToken])

     
        return (
            <Flex w={'100%'} align={'center'}  my={2} justify={'center'} m={'auto'} 
            >
                <Select placeholder='Connection' onChange={(e)=>{
                    if(e.target.value === 'login'){
                        login()
                    }else{
                        if(e.target.value==='')
                        setTargetMail(null)
                        else
                        setTargetMail(e.target.value)
                    }
                }}>
                    {accounts.map((account,i) => (
                        <option key={i} value={account.username}>{account.username}</option>
                    ))}
                    
                    <option value="login">Login to account</option>

                </Select>
            </Flex>
        )
    
}

const OutlookLoginButton = ({setContacts,setTargetMail} : {setContacts : React.Dispatch<any>, setTargetMail : React.Dispatch<string|null>}) => {
    //@ts-ignore
  const msalInstance =  new PublicClientApplication(msalConfig);
    msalInstance.addEventCallback((event:any) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
  });
  
  
  return (
     <MsalProvider instance={msalInstance}>
        <LoginButton setContacts={setContacts} setTargetMail={setTargetMail} />
     </MsalProvider>
  )
}

export default OutlookLoginButton


const msalConfig = {
    auth: {
        clientId: process.env.NEXT_PUBLIC_OUTLOOK_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
        authority: "https://login.microsoftonline.com/common", // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: 'https://localhost:3000/', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
         },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            
        }
    }
};