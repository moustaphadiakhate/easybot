var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()

var text_rep = require('./lib/text_reponse')
var pb_rep = require('./lib/postback_reponse')
var send_message = require('./lib/send_message')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(process.env.PORT || 3000)

// Server frontpage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

// Facebook Webhook
app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'easybot_verify_token') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Invalid verify token')
  }
})

// RECEPTION DE MESSAGE :::::::::::

app.post('/webhook', function (req, res) {
  var events = req.body.entry[0].messaging
  for (i = 0; i < events.length; i++) {
    var event = events[i]
    // gestion d'un nouveau user

    if (event.message && event.message.text) {
      var text = event.message.text.toLowerCase()
      // switch pour les réponses texte
      text_rep(text, event.sender.id)
    } else if (event.postback && event.postback.payload) {
      // CAS DE POSTBACK :::::::::::
      var theId = event.postback.payload.toString()
      // savoir le where :
      // rechercher l'object ::
      pb_rep(theId, event.sender.id)
    }

    res.sendStatus(200)
  }
})
