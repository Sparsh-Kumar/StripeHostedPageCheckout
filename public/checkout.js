
$('#pay-button').click (function () {

    // getting the value of public key
    var publicKey = $('#public-key').attr ('value');
    console.log (publicKey);
    var stripe = Stripe (publicKey);

    // on click of button create a post request to the server
    fetch ('http://localhost:80/api/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify ({

            productID: '60ad60a07c6d9ada7ccaf494',
            quantity: 4
    
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then ((response) => {
        return response.json ()
    }).then ((session) => {
        return stripe.redirectToCheckout ({ sessionId: session.sessionID })
    }).then ((result) => {
        if (result.error) {
            $('#error').text = result.error.message;
        }
    }).catch ((error) => {
        $('#error').text = error.message;
    })

})