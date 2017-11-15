$(function() {
    
    function user_cancel_notify() {
        parent.postMessage(JSON.stringify({
            event: 'user_cancel'
        }), "*")
    }
    
    window.addEventListener("message", function(event){
        var data = JSON.parse(event.data)
        if(data.event == "get_payment_url") {
            var iframe = document.createElement('iframe')
            iframe.id = "iframe_linepay"
            iframe.src = data.paymentUrl
            // iframe.style = "width:100%; height:100%;display: block;"
            iframe.style = "position:relative; width:100%; height:650px; z-index: 1000;"
            document.body.append(iframe)

            var button = document.createElement("button")
            button.addEventListener('click', user_cancel_notify)
            button.textContent = "X"
            button.style = "float:right; color: black"
            document.body.prepend(button)

        }else if(data.event == "iframe_result") {

            parent.postMessage(JSON.stringify({
                event: 'payment_result',
                transactionId : data.transactionId,
                orderId : data.orderId
            }), "*")

        }

    }, false)
    
    
    // Ask for linepay payment url
    parent.postMessage(JSON.stringify({
        event: 'get_payment_url'
    }), "*")
})




