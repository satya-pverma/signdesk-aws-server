'use strict'
const fastify = require('fastify')({
    logger: true
  })

  fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
    jsoffParser(payload, function (err, body) {
      done(err, body)
    })
  })

//fastify.register(require('middie'))
 fastify.register(require('fastify-cors'))
// fastify.register(require('fastify-express'))
// fastify.register(require('fastify-favicon'))
 fastify.register(require('./routes/esignRoute'))


fastify.get('/',async(request,reply)=>{
  reply.send("welcome to signdesk server provider")
})
  
fastify.listen(process.env.PORT || 4000,'0.0.0.0', function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})

//https://github.com/satya-pverma/signdesk-server.git