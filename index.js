const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var request = require('request');
const port = 80

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
    // app.use(bodyParser.urlencoded(
    //   { extended: true,
    //     parameterLimit: 200, //Params Maxmin
    //     limit: 100*1024 //default 100k
    //   }))

/* ::JSON:: http://jsonapi.org */
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
    // app.use(bodyParser.json(
    // { type: 'application/vnd.api+json',
    //   parameterLimit: 200,  //Params Maxmin,
    //   limit:100*1024 //default 100k
    // }))

app.use('/', express.static(__dirname + "/public/html")) //serve static content
app.use('/js', express.static(__dirname + "/public/js")) //serve static content

app.post('/test', (req, res, next) => {
    console.log(req.body);
    console.log(`User    :  ${req.body.user_name}`);
    console.log(`Text    :  ${req.body.text}`);
    console.log(`Command :  ${req.body.command}`);
                                       
    return res.json({
        text: 'Command is successful'
    })
})

app.get('/confirm_order', (req, res, next) => {
    
    var transactionId = req.query.transactionId
    
    confirmOrder(transactionId, function(err, result){
        console.log(result)
        res.redirect(`/result.html?transactionId=${result.info.transactionId}&orderId=${result.info.orderId}`);
    
    })

})

app.post('/create_order', (req, res, next) => {
    
    var order_id = req.body.order_id
    console.log(order_id)
    reserveOrder(order_id, function(err, result){
        console.log("[1] reserveOrder")
        if(err) {
            console.log("[2] reserveOrder err")
            console.log(err)
            return res.json({
                "paymentUrl": "Error"
            })
        }

        console.log("[3] reserveOrder success")
        console.log(result)
        res.json({
            "paymentUrl": result.info.paymentUrl.web
        })

    })
})

app.listen(port)

function reserveOrder(order_id, callback) {
    
    console.log("[4] reserveOrder function")
    var options = {
        url: 'https://sandbox-api-pay.line.me/v2/payments/request',
        method: 'POST',
        json: true,
        body: {
            "productName" : "TapPay X LinePay",
            "amount" : 1,
            "currency" : "TWD",
            "confirmUrl" : "https://linepay-test.tappaysdk.com/confirm_order",
            "orderId" : order_id
        },
        headers: { "content-type": "application/json", "X-LINE-ChannelId":"1540179966", "X-LINE-ChannelSecret":"bfd45f696e4421f39bb6d35f23475c3a" }
    }
    // Get Status
    sendRequest(options, callback)    
    
}

function confirmOrder(transaction_id, callback) {
    
    var options = {
        url: `https://sandbox-api-pay.line.me/v2/payments/${transaction_id}/confirm`,
        method: 'POST',
        json: true,
        body: {
            "amount" : 1,
            "currency" : "TWD"
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