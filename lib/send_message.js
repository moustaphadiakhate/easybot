
var request = require('request')

var send_message = {

  send: function (destinator, message) {
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: {
        recipient: { id: destinator },
        message: message
      }
    }, function (error, response, body) {
      if (error) {
        console.log('Error sending message: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  }
}

module.exports = send_message
