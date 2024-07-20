import process from 'process'
import {google} from 'googleapis';
import { NextApiRequest,NextApiResponse } from 'next';
import jwt_decode from "jwt-decode";

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/contacts.readonly'];

const oAuth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
    'postmessage',
  );

  

export default async function handler(req : NextApiRequest,res : NextApiResponse) {
    if(req.method === 'POST'){
        if (req.query && req.query.check === 'true'){
            try {
                
                const {token} = req.body
                oAuth2Client.setCredentials({refresh_token : token})
                const {res : response} = await oAuth2Client.getAccessToken()
                const {data}:any = response
                
                const creds = jwt_decode(data.id_token)
                res.status(200).send(creds)
                
            } catch (error) {
                res.status(401).send({message : 'expired'})
            }
        }else if (req.query && req.query.login === 'true'){
            try {
                const body = req.body
                const { tokens } = await oAuth2Client.getToken(body.code);
                const jwt : string |null | undefined = tokens.id_token
                if(jwt) {
                    let data:any = jwt_decode(jwt)
                    data.refresh_token = tokens.refresh_token
                    res.status(200).send(data)
                }
                oAuth2Client.setCredentials(tokens)
                
            } catch (error) {
                console.log(error)
            }
        }else if (req.query && req.query.contacts === 'true'){
            try {
                
                const {token} = req.body
                oAuth2Client.setCredentials({refresh_token : token,scope:SCOPES[1]})
                const gmail = google.gmail({version : 'v1' , auth : oAuth2Client})
                const messages = await gmail.users.messages.list({userId : 'me'})
                const {data:{messages:data}} = messages
                if(Array.isArray(data) && data.length>0){

                     let list:any = []
                    for (let i = 0; i < (data.length / 3); i++) {
                        const el = data[i]
                        const {id} : any  = el || undefined
                        const message = await gmail.users.messages.get({id,userId : 'me',metadataHeaders:['From'],format:'full'})
                        const from = message.data.payload?.headers?.filter(e => e.name === 'From')[0].value
                        if(from){
                            let email = from.replace(/>/g,'').split('<')
                            let mailObj = {name : email[0],email:email[1]}
                            if(email[0].includes('@')) mailObj = {name : '',email:email[0]}
                            list = [...list,{name : email[0],address:email[1]}]
                        }
                    }
                    res.status(200).send(list) 
                }else{
                    res.status(200).send([])
                }
            } catch (error) {
               res.status(400).send(error)    
            }
              
        }
    }
}