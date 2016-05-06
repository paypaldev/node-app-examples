# Simple-Express-Server

-----

## Purpose of this App

This Simple Express App is meant to demonstrate the API calls required for Express Checkout, and show a very generic flow using the simpliest example of a link going to the PayPal checkout pages.

## Using this app

After running the [install.js](../install.js) follow these steps:

1. `$ cd simple-express-server`
2. `$ node app.js`
3. Open your browser to [http://localhost:3000](http://localhost:3000)
4. Click the "Checkout" link on the page.

## Logs in the Terminal

In the terminal you will see the following:


```sh
----------------------------------------------------------
----------       ACCESS TOKEN RESPONSE          ----------
----------------------------------------------------------
"Bearer <YOUR GENERATED ACCESS TOKEN>"
----------------------------------------------------------
----------             CREATE PAYMENT           ----------
----------------------------------------------------------
{"intent":"sale","redirect_urls":{"return_url":"http://localhost:3000/return","cancel_url":"http://localhost:3000/cancel"},"payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description."}]}
----------------------------------------------------------
----------     CREATE PAYMENT RESPONSE          ----------
----------------------------------------------------------
{"id":"PAY-8FS996938V603214FK4V274Y","intent":"sale","state":"created","payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description.","related_resources":[]}],"create_time":"2016-05-05T20:41:23Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-8FS996938V603214FK4V274Y","rel":"self","method":"GET"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-32H02340AX596892Y","rel":"approval_url","method":"REDIRECT"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-8FS996938V603214FK4V274Y/execute","rel":"execute","method":"POST"}],"httpStatusCode":201}
------ Token Split ------
{ redirectUrl: 'https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-32H02340AX596892Y',
  token: 'EC-32H02340AX596892Y' }
----------------------------------------------------------
----------          REDIRECTING USER            ----------
----------------------------------------------------------
https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-32H02340AX596892Y
```

During the above, you would have seen your browser redirect to the `URL` as shown in the final output in the console.

In your browser:

1. Login with your sandbox buyer account.
2. Click "Pay Now".
3. You'll now be sent to the `return_url` as set in the `Create Payment` payload above.

In the terminal you will see the following:

```sh
----------------------------------------------------------
----------       RETURN WITH QUERY PARAMS       ----------
----------------------------------------------------------
{"paymentId":"PAY-8FS996938V603214FK4V274Y","token":"EC-32H02340AX596892Y","PayerID":"N9DBPUZ67JDBC"}
----------------------------------------------------------
----------             PAYMENT DETAILS          ----------
----------------------------------------------------------
{"id":"PAY-8FS996938V603214FK4V274Y","intent":"sale","state":"created","cart":"32H02340AX596892Y","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@domainurl.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"408-520-5199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"payee":{"email":"nodejs@rest.com"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[],"notify_url":"http://domainurl.com/ipn/ipn_paypal.php"}],"redirect_urls":{"return_url":"http://localhost:3000/return?paymentId=PAY-8FS996938V603214FK4V274Y","cancel_url":"http://localhost:3000/cancel"},"create_time":"2016-05-05T20:41:23Z","update_time":"2016-05-05T20:44:32Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-8FS996938V603214FK4V274Y","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-8FS996938V603214FK4V274Y/execute","rel":"execute","method":"POST"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-32H02340AX596892Y","rel":"approval_url","method":"REDIRECT"}],"httpStatusCode":200}
----------------------------------------------------------
----------      PAYMENT COMPLETED DETAILS       ----------
----------------------------------------------------------
{"id":"PAY-8FS996938V603214FK4V274Y","intent":"sale","state":"approved","cart":"32H02340AX596892Y","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@domainurl.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"4085205199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD","details":{}},"payee":{"merchant_id":"MFUX86KBB6EM2"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[{"sale":{"id":"9423073441679304W","state":"completed","amount":{"total":"7.47","currency":"USD","details":{}},"payment_mode":"INSTANT_TRANSFER","protection_eligibility":"ELIGIBLE","protection_eligibility_type":"ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE","transaction_fee":{"value":"0.52","currency":"USD"},"parent_payment":"PAY-8FS996938V603214FK4V274Y","create_time":"2016-05-05T20:44:33Z","update_time":"2016-05-05T20:44:33Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/sale/9423073441679304W","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/sale/9423073441679304W/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-8FS996938V603214FK4V274Y","rel":"parent_payment","method":"GET"}]}}]}],"create_time":"2016-05-05T20:44:34Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-8FS996938V603214FK4V274Y","rel":"self","method":"GET"}],"httpStatusCode":200}
```

The transaction has been completed. You'll want to review the [app.js](app.js) file for more info.