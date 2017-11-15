$(function() {
    
    var $returnButton = $('#returnButton');
    $returnButton.click(function() {
        window.location = "https://linepay-test.tappaysdk.com"
    })

    var url = window.location.href 
    var path = window.location.pathname

    var url = new URL(url);
    var result_transactionId = url.searchParams.get("transactionId");
    var result_orderId = url.searchParams.get("orderId");
    console.log(result_transactionId)
    console.log(result_orderId)
    
    document.getElementById("result_order_id").innerHTML = "Order ID : "+result_orderId
    document.getElementById("result_transaction_id").innerHTML = "Transaction ID : "+result_transactionId

      
})




