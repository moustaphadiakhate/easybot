send_message = require('./send_message')
message_template = require('./message_template')

var postback_reponse = function (thePbId, destinator) {
  var newPbId = thePbId.substring(1, thePbId.length)
  switch (thePbId[0]) {
    case 'i':
      RS.message_template.rep_pbk_infos(destinator, newPbId)
      break
    default:
      RS.send_message.send(destinator, {
        text:
            "Bienvenue, \nJ'ai toute ce qu'il vous faut lOl !!!"
      })
  }
}

module.exports = postback_reponse
