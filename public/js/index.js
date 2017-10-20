$(function() {
    
    var $sendButton = $('#sendButton');
    $sendButton.click(function() {
        
        var order_id = makeid()
        $.ajax({
            url: '/create_order',
            data: {"order_id": order_id},
            type: "POST",
            dataType: 'json',

            success: function(result) {
                console.log(result.paymentUrl)
                window.location(result.paymentUrl)
            },

            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });

    })

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 10; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
      
})