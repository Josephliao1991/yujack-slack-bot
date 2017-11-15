$(function() {
    
    var parser = new UAParser();
    var device_os = parser.getResult().os.name;
    console.log(device_os)
    var linepayPaymentUrl = ""
    var $sendButton = $('#sendButton');
    var order_id = makeid()
    var url = window.location.href 
    var path = window.location.pathname

    document.getElementById("order_id").innerHTML = "Order ID : "+order_id

    $sendButton.click(function() {
        
        $.ajax({
            url: '/prod/create_order',
            data: {"order_id": order_id},
            type: "POST",
            dataType: 'json',

            success: function(result) {
                handleUrl(result.paymentUrl)
            },

            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

    })


    function makeid() {
        var text = "";
        var abcPossible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      
        for (var i = 0; i < 2; i++) {
          text += abcPossible.charAt(Math.floor(Math.random() * abcPossible.length));
        }

        var numPossible = "0123456789"

        for (var i = 0; i < 8; i++) {
            text += numPossible.charAt(Math.floor(Math.random() * numPossible.length));
        }
      
        return text;
    }


    function handleUrl(paymentUrl){
        console.log(paymentUrl)
        //redirect(paymentUrl) 
        // if(device_os === "iOS" || device_os === "Android") {
        //     redirect(paymentUrl)        
        // }else {
        //     openIframe(paymentUrl)
        // }
        
    }
        
    function openIframe(paymentUrl){
        linepayPaymentUrl = paymentUrl
        document.body.style = ""
        document.body.style = "background-color: rgba(0,0,0,0.8)"
        var iframe = document.createElement('iframe')
        iframe.id = "iframe_callback"
        iframe.src = "https://linepay-test.tappaysdk.com/iframe_callback.html"
        iframe.style = "position:relative; width:90%; height:700px; margin: -35px auto 0 auto; z-index: 1000;"
        document.body.append(iframe)
        window.addEventListener("message", function(event){
            var data = JSON.parse(event.data)
            if (data.event == "user_cancel") {
                // Cancel
                document.getElementById('iframe_callback').remove()
                document.body.style = ""
                alert("Cancel Payment!")

            }else if(data.event == "payment_result") {
                // Payment Result
                document.getElementById('iframe_callback').remove()
                document.body.style = ""
        
                // Redirect / Formsubmit To Finish Page.
                window.location = "https://linepay-test.tappaysdk.com/result.html?transactionId="+data.transactionId+"&orderId="+data.orderId+""
        
            }else if(data.event == "get_payment_url") { 
                document.getElementById("iframe_callback").contentWindow
                .postMessage(JSON.stringify({
                    event: "get_payment_url",
                    paymentUrl: linepayPaymentUrl
                }), "*")
            }

                   
        }, false)
                
    }
            
    function redirect(paymentUrl){
        
        window.location=paymentUrl
    
    }
      
})












/*

// outside website
document.body.style = ""
document.body.style = "background-color: rgba(0,0,0,0.8)"
var iframe = document.createElement('iframe')
iframe.id = "iframe-test"
iframe.src = "https://tpdirect-demo.tappaysdk.com"
iframe.style = "position:relative; width:70%; height:70%; margin: 200px auto 0 auto; z-index: 100; display: block;"
document.body.prepend(iframe)
window.addEventListener("message", function(event){
    var data = JSON.parse(event.data)
    if (data.event = "inside_done_then_post_to_outside") {
        // do something
        document.getElementById('iframe-test').remove()
        document.body.style = ""
        window.location = "https://www.tappaysdk.com/tch"
    }
}, false)
// inside (iframe)
function inside_done_then_post_to_outside() {
    parent.postMessage(JSON.stringify({
        event: 'inside_done_then_post_to_outside'
    }), "*")
}
var button = document.createElement("button")
button.addEventListener('click', inside_done_then_post_to_outside)
button.textContent = "X"
button.style = "float:right; color: black"
document.body.prepend(button)

*/