var request = require('request');


getTransactionStatus("TP20171020_00000007", function(err, result){

    console.log(result)

})

function getTransactionStatus(order_id, callback) {
    
    var options = {
        url: 'https://sandbox-api-pay.line.me/v2/payments/request',
        method: 'POST',
        json: true,
        body: {
            "productName" : "TapPay X LinePay",
            "amount" : 1,
            "currency" : "TWD",
            "confirmUrl" : "https://yu-jack-slack-slack-bot.herokuapp.com/linepay",
            "orderId" : order_id
        },
        headers: { "content-type": "application/json", "X-LINE-ChannelId":"1540179966", "X-LINE-ChannelSecret":"bfd45f696e4421f39bb6d35f23475c3a" }
    }
    // Get Status
    sendRequest(options, callback)    
    
}

function sendRequest(options, Callback) {
    
    request(options, function(error, response, result) {
        if (error) { // Check Error
            return Callback(error)
        }
    
        if (response.statusCode != 200) { // Check StatusCode
            return Callback(response.statusCode)
        }
    
        // 4. Parse Json
        try {
            Callback(null, result)
        } catch (Exception) {
            Callback(Exception)
        }
    
    })
    
}