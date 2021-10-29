const axios=require("axios")
const {parse, stringify, toJSON, fromJSON} = require('flatted')
async function routes (fastify, options) {

    
    
    fastify.post('/esign',async (request, reply) => {
       
       console.log(request.body.reference_id) 
       
      
            const result= await axios.post('https://uat.signdesk.in/api/sandbox/signRequest',request.body,{
          headers:{
              "x-parse-rest-api-key":"a5670ee6a7c14c4e4015208cc9dbaf43",
              "x-parse-application-id":"nowy-az-private-limited_esign_uat",
              "Content-Type":"application/json",
          }
      })
      console.log(result.data)
     var resu= stringify(result.data)
      // console.log(resu)
      // var dt=toJSON(resu)
      // await axios.post('https://webhooks.mongodb-realm.com/api/client/v2.0/app/weavy-settlefirst-jnjtl/service/hooks/incoming_webhook/response-signdesk-esign',result.data,{
      //   headers:{
      //     "Content-Type":"application/json"
      //   }
      // })
      await reply.send(resu)

      // await reply.send("done")
    })



    fastify.post('/estamp', async (request, reply) => {
      // console.log(request.body)
      var party=[]
      
      request.body.signers_info.map(item=>{
        party.push(item.signer_name)
      })
      
          var payload={
              "reference_id": request.body.reference_id,
              "content": request.body.documents[0].content,
              "first_party_name": party[0],
              "second_party_name": party[1],
              "duty_payer_phone_number": "1234567890",
              "first_party_address": {
                "street_address": "ads",
                "locality": "ads",
                "city": "Chennai",
                "state": "TN"
              },
              "second_party_address": {
                "street_address": "asdji",
                "locality": "sdljks",
                "city": "Pune",
                "state": "MH"
              },
              "stamp_amount":"10",
              "consideration_amount":"20",
              "stamp_state": "KA",
              "stamp_duty_paid_by": "First Party",
              "document_category":"1",
              "document_reference_no": "LAN1234RFDEPPO",
              "esbtr_details":null,
              "stamp_type": "SHCIL",
              "custom": {
              }
            }

            
            const response= await axios.post('https://uat.signdesk.in/api/estamp/requestStampPaper',payload,{
              headers:{
                  "x-parse-rest-api-key":"9bebec03befe83042429842788eec4ba",
                  "x-parse-application-id":"nowy-az-private-limited_estamp_uat",
                  "Content-Type":"application/json",
              }
          })
          console.log(response)
          var obj={
            status:response.data.status,
            content:response.data.content,
            stamp_number:response.data.stamp_paper_number
          }
             console.log(obj)
          
    await reply.send(obj)
 
    
  
  //   console.log(response.data)

  

  })

    

    
}  


module.exports = routes
// https://github.com/satya-pverma/signdesk-server.git