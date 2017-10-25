$(function() {
    
    var $sendButton = $('#sendButton');
    var order_id = makeid()
    var url = window.location.href 
    var path = window.location.pathname
    console.log(url)
    console.log(path)
    if(path === "/result.html") {
        var $returnButton = $('#returnButton');
        $returnButton.click(function() {
            window.location = "https://linepay-test.tappaysdk.com"
        })

        var url = new URL(url);
        var result_transactionId = url.searchParams.get("transactionId");
        var result_orderId = url.searchParams.get("orderId");
        
        document.getElementById("result_order_id").innerHTML = "Order ID : "+result_orderId
        document.getElementById("result_transaction_id").innerHTML = "Transaction ID : "+result_transactionId

        return
    }

    document.getElementById("order_id").innerHTML = "Order ID : "+order_id

    $sendButton.click(function() {
        
        $.ajax({
            url: '/create_order',
            data: {"order_id": order_id},
            type: "POST",
            dataType: 'json',

            success: function(result) {
                console.log(result.paymentUrl)
                window.location = result.paymentUrl
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

      
})