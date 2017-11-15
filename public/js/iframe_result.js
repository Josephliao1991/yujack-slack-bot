$(function() {
    
    var url = window.location.href 
    var path = window.location.pathname

    var url = new URL(url);
    var result_transactionId = url.searchParams.get("transactionId");
    var result_orderId = url.searchParams.get("orderId");

    
    if(inIframe()) {
        parent.postMessage(JSON.stringify({
            event: 'iframe_result',
            transactionId : result_transactionId,
            orderId : result_orderId
        }), "*")
    }else {
        window.location = "https://linepay-test.tappaysdk.com/result.html?transactionId="+result_transactionId+"&orderId="+result_orderId+""
    }

    function inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    
    
})