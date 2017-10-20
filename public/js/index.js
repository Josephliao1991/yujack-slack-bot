$(function() {
    
    var $sendButton = $('#sendButton');
    $sendButton.click(function() {
        
        var order_id = document.getElementById("order_id").value
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
    
})