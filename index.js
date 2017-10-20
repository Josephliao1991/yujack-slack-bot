const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.post('/test', (req, res, next) => {
    console.log(req.body);
    console.log(`User    :  ${req.body.user_name}`);
    console.log(`Text    :  ${req.body.text}`);
    console.log(`Command :  ${req.body.command}`);
                                       
    return res.json({
        text: 'Command is successful'
    })
})

app.get('/linepay', (req, res, next) => {
    console.log(req.body);
    console.log(req.query);
                                       
    return res.json({
        "body": req.body,
        "query":req.query
    })
})

// heroku will set port via env PORT
const port = process.env.PORT || 8080

app.listen(process.env.PORT || 8080)