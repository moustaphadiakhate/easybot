var fs = require('fs')
var PATH = require('../collected_data')
var send_message = require('./send_message')

var message_template = {
  rep_infos: function (recipient_id) {
    var t, l, d, en, gid
    var tab = []

    fs.readFile(PATH, function (err, data) {
      // parse pour te traitement
      data = data.toString()
      var list = JSON.parse(data)

      //  TEST D EXISTANCE D OCCURENCES.
      if (list) {
        for (var j = 0; j < 10; j++) {
          var element = {}
          var buttonPbk = {}
          var sharebt = {}
          t = list[j].title
          l = list[j].link
          d = list[j].description
          en = list[j].enclosure[0].$.url
          // recuperation du GUID
          guid = list[j].guid[0]._

          // limiter a 80 pour le titre de chaque l'article
          element.title = t.substring(0, 80)
          element.subtitle = d.substring(0, 50) + '...'
          element.item_url = l
          element.image_url = en
          element.buttons = [buttonPbk, sharebt]
          buttonPbk.type = 'postback'
          buttonPbk.title = 'description'
          buttonPbk.payload = 'i' + guid
          sharebt.type = 'element_share'
          // affecter au tableau indice i
          tab[j] = element
        }
        var resultat = JSON.stringify(tab)

        var messageData = {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: resultat
            }
          }
        }

        send_message.send(recipient_id, messageData)
      } else {
        send_message.send(recipient_id, {
          text: 'Echo: pas d informations recents!'
        })
      }
    })
  },

  rep_pbk_infos: function (recipient_id, idbi) {
    var t, l, d, en, gid
    var tab = []

    // modules : file systeme pour atteindre labase de donne JSON
    fs.readFile(PATH, function (err, data) {
      // parse pour te traitement
      data = data.toString()
      var list = JSON.stringify(data)

      //  TEST D EXISTANCE D OCCURENCES.
      if (list) {
        for (var k = 0; k < list.length; k++) {
          if (idbi === list[k].guid) {
            // code du si OCCURENCE :
            var l = list[k].link
            var d = list[k].description

            l = l.toString()
            d = d.toString()

            var messageData = {
              attachment: {
                type: 'template',
                payload: {
                  template_type: 'button',
                  text: d,
                  buttons: [
                    {
                      type: 'web_url',
                      url: l,
                      title: 'GO !'
                    }
                  ]
                }
              }
            }

            send_message.send(recipient_id, messageData)

            break
          }
          // code du PAS D'OCCURENCE :
          else {
            if (k === list.length - 1) {
              // code du PAS D'OCCURENCE :
              send_message.send(recipient_id, {
                text: 'Nous avons plus ça !!'
              })
            }
          }

          // fin for ! il est temps d'envoyer que nous avons plus cet article
        }
      } else {
        send_message.send(recipient_id, { text: 'Nous avons plus ça !!' })
      }
    })
  }
}

module.exports = message_template
