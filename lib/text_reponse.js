var send_message = require('./send_message')
var message_template = require('./message_template')

var text_reponse = function (textReq, destinator) {
  switch (textReq) {
    case '@infos':
      RS.message_template.rep_infos(destinator)
      break
    case '@aide':
      RS.send_message.send(destinator, {
        text:
              "VOS OPTIONS:\n \n @infos : pour voir les informations les plus recentes du football europeen\n \n @prochain : pour voir les grandes rencontres a l'attente du pubique \n \n @ligue1 : voir les resultats du championnat francais \n \n @bundesliga : voir les resultats du championnat allemand \n \n @seriea : voir les resultats du championnat Italien \n \n @liga : voir les resultats du championnat espagnol \n \n @barcklays : voir les resultats du championnat Anglaise \n \n @inscription: pour s'incrire aux alertes d'atualités"
      })
      break
    default:
      RS.message_template.Repdefault(destinator, textReq)
  }
}

module.exports = text_reponse
