import React,{useState,useEffect} from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Flex,Text,Divider,Spinner,Select } from '@chakra-ui/react';
import axios from 'axios'
import gmailLogo from './gmailLogo.svg'
import Image from 'next/image'
import { useGetAppToken } from '@/hooks/automation/useAppToken';



interface Credentials {
    picture : string,
    name : string,
    email : string
}

const GoogleLogin = ({setContacts,setTargetMail} : {setContacts : React.Dispatch<any> , setTargetMail : React.Dispatch<string|null>}) => {

    const [credentials,setCredentials] = useState<Credentials | null>(null)
    const [loading,setLoading] = useState(false)
    const [token,setToken] = useGetAppToken('gmail')

    const checkLogin = async (token:string) => {
        setLoading(true)
        try {
            const {data,status} = await axios.post('/api/googleAuth?check=true',{token:token})
            if(status === 200){
                setCredentials(data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
        }
    }

    const getContacts = async (token:string) => {
        try {
            const {data} = await axios.post('/api/googleAuth?contacts=true',{token})
            setContacts(data)
        } catch (error) {
            
        }
    }


    const googleLogin = useGoogleLogin({
        scope : 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/contacts.readonly',
        onSuccess: async ({ code }) => {
            setLoading(true)
          const {data,status} = await axios.post('/api/googleAuth?login=true',{
            code : code
            })
            
            if(status ===200){
                setCredentials(data)
                setLoading(false)
                if(data.refresh_token){
                    setToken(data.refresh_token)
                }
            }
        },
        onError : () => {
            setLoading(false)
        },
        flow: 'auth-code',
      });

      useEffect(()=>{
        if(token){
          checkLogin(token)
        } 
      },[token])
      useEffect(()=>{
        if(credentials){
          getContacts(token)
        } 
        // eslint-disable-next-line
      },[credentials])

    
    
    
    
        return(
            <Flex w={'100%'} align={'center'} my={2} justify={'center'} m={'auto'} columnGap={2} 
            >
                <Select placeholder='Connection' onChange={(e)=>{
                    if(e.target.value === 'login'){
                        googleLogin()
                    }else{
                        if(e.target.value === '')
                        setTargetMail(null)
                        else
                        setTargetMail(e.target.value)
                    }
                }}>
                    {credentials && <option value={credentials.email} >{credentials.email}</option>}
                    <option value="login">Login to account</option>

                </Select>
            </Flex>
        )
   
}


const GoogleLoginButton = ({setContacts,setTargetMail} : {setContacts : React.Dispatch<any>, setTargetMail : React.Dispatch<string|null>} ) => {
return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}> 
        <GoogleLogin setContacts={setContacts} setTargetMail={setTargetMail} />
    </GoogleOAuthProvider>
)
}

export default GoogleLoginButton