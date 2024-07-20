import { NextApiRequest,NextApiResponse } from 'next';
import { Client } from '@microsoft/microsoft-graph-client';




export default async function handler(req : NextApiRequest,res : NextApiResponse) {
    if(req.method === 'POST'){
        const token = req.body.token
        const options = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        const client = Client.init({
            authProvider : (done) => {
                done(null,token)
            }
        })

        try {
        const resp = await client.api('/me/contacts').get()
        const {value} = resp;
        let formattedData : {name : string,address : string|undefined}[] = []
        if(value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                const element = value[i];
                const entry = {
                    name : element.displayName,
                    address : element.emailAddresses[0]?.address
                }
                formattedData = [...formattedData,entry]
                
            }
        }
        res.status(200).send(formattedData)

            
        } catch (error) {
            res.status(401).send(error)
        }
    }
    
    
}