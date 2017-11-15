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
    
    confirmOrder(transactionId, "1540179966", "bfd45f696e4421f39bb6d35f23475c3a", function(err, result){
        console.log(result)
        var transactionId = result.info.transactionId
        var orderId = result.info.orderId
        res.redirect(`/iframe_result.html?transactionId=${transactionId}&orderId=${orderId}`);
    
    })

})

app.get('/confirm_order_tappay', (req, res, next) => {
    
    var transactionId = req.query.transactionId
    
    confirmOrder(transactionId, "1546418144", "28851d36b969c0992e1db9f68b3f71e3", function(err, result){
        console.log(result)
        var transactionId = result.info.transactionId
        var orderId = result.info.orderId
        res.redirect(`/iframe_result.html?transactionId=${transactionId}&orderId=${orderId}`);
    
    })

})


app.post('/create_order', (req, res, next) => {
    
    var order_id = req.body.order_id
    console.log(order_id)
    reserveOrder(order_id, "1540179966", "bfd45f696e4421f39bb6d35f23475c3a", function(err, result){
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

app.post('/create_order_tappay', (req, res, next) => {
    
    var order_id = req.body.order_id
    console.log(order_id)
    reserveOrder(order_id, "1546418144", "28851d36b969c0992e1db9f68b3f71e3", function(err, result){
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

function reserveOrder(order_id, channel_id, channel_secret, callback) {
    
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
        headers: { "content-type": "application/json", "X-LINE-ChannelId":channel_id, "X-LINE-ChannelSecret":channel_secret }
    }
    // Get Status
    sendRequest(options, callback)    
    
}

function confirmOrder(transaction_id, channel_id, channel_secret, callback) {
    
    var options = {
        url: `https://sandbox-api-pay.line.me/v2/payments/${transaction_id}/confirm`,
        method: 'POST',
        json: true,
        body: {
            "amount" : 1,
            "currency" : "TWD"
        },
        headers: { "content-type": "application/json", "X-LINE-ChannelId":channel_id, "X-LINE-ChannelSecret":channel_secret }
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