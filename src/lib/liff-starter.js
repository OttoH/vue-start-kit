
let liff
if (liff) {
  liff.init(function (data) {
    console.log(data.context.userId)
  })
}

export const sendLiffMsg = (text) => {
  if (liff) {
    liff.sendMessages([
      {
        type: 'text',
        text
      }
    ]).then(function () {
        if(window) {
          window.alert("Message sent")
        }
    }).catch(function (error) {
        if (window) {
          window.alert("Error sending message: " + error)
        }
    })
  }
}
