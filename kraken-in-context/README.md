# Kraken-In-Context

-----

## Description

This app, is somewhat similar to the Express Apps, except it uses the [KrakenJS](http://krakenjs.com/) framework which is built on top of [ExpressJS](http://expressjs.com/), and uses the [DustJS](http://www.dustjs.com/) templating engine.

## Using this app

After running the [install](../install.js) and [setup](../setup.js) follow these steps:

1. `$ cd kraken-in-context`
2. `$ npm start`
3. Open your browser to [http://localhost:8000](http://localhost:8000)
4. Click the "PayPal Check Out" button on the page.

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
{"intent":"sale","redirect_urls":{"return_url":"http://localhost:8000/return","cancel_url":"http://localhost:8000/cancel"},"payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description."}]}
----------------------------------------------------------
----------     CREATE PAYMENT RESPONSE          ----------
----------------------------------------------------------
{"id":"PAY-5RT91585VP524725KK4WOVKQ","intent":"sale","state":"created","payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description.","related_resources":[]}],"create_time":"2016-05-06T19:04:10Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-5RT91585VP524725KK4WOVKQ","rel":"self","method":"GET"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1VL43735LT646832K","rel":"approval_url","method":"REDIRECT"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-5RT91585VP524725KK4WOVKQ/execute","rel":"execute","method":"POST"}],"httpStatusCode":201}
------ Token Split ------
{ redirectUrl: 'https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-1VL43735LT646832K',
  token: 'EC-1VL43735LT646832K' }
----------------------------------------------------------
----------          REDIRECTING USER            ----------
----------------------------------------------------------
https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-1VL43735LT646832K
```

During the above, you would have seen your browser open the In-Context window to the `URL` as shown in the final output in the console.

In the mini-browser:

1. Login with your sandbox buyer account.
2. Click "Pay Now".
3. The mini-browser will close, and you will now be sent to the `return_url` as set in the `Create Payment` payload above.

In the terminal you will see the following:

```sh
----------------------------------------------------------
----------       RETURN WITH QUERY PARAMS       ----------
----------------------------------------------------------
{"paymentId":"PAY-5RT91585VP524725KK4WOVKQ","token":"EC-1VL43735LT646832K","PayerID":"N9DBPUZ67JDBC"}
----------------------------------------------------------
----------             PAYMENT DETAILS          ----------
----------------------------------------------------------
{"id":"PAY-5RT91585VP524725KK4WOVKQ","intent":"sale","state":"created","cart":"1VL43735LT646832K","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@website.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"408-520-5199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"payee":{"email":"nodejs@rest.com"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[],"notify_url":"http://website.com/ipn/ipn_paypal.php"}],"redirect_urls":{"return_url":"http://localhost:8000/return?paymentId=PAY-5RT91585VP524725KK4WOVKQ","cancel_url":"http://localhost:8000/cancel"},"create_time":"2016-05-06T19:04:10Z","update_time":"2016-05-06T19:04:24Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-5RT91585VP524725KK4WOVKQ","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-5RT91585VP524725KK4WOVKQ/execute","rel":"execute","method":"POST"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1VL43735LT646832K","rel":"approval_url","method":"REDIRECT"}],"httpStatusCode":200}
----------------------------------------------------------
----------      PAYMENT COMPLETED DETAILS       ----------
----------------------------------------------------------
{"id":"PAY-5RT91585VP524725KK4WOVKQ","intent":"sale","state":"approved","cart":"1VL43735LT646832K","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@website.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"4085205199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD","details":{}},"payee":{"merchant_id":"MFUX86KBB6EM2"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[{"sale":{"id":"0LU3517370705282X","state":"completed","amount":{"total":"7.47","currency":"USD","details":{}},"payment_mode":"INSTANT_TRANSFER","protection_eligibility":"ELIGIBLE","protection_eligibility_type":"ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE","transaction_fee":{"value":"0.52","currency":"USD"},"parent_payment":"PAY-5RT91585VP524725KK4WOVKQ","create_time":"2016-05-06T19:04:25Z","update_time":"2016-05-06T19:04:25Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/sale/0LU3517370705282X","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/sale/0LU3517370705282X/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-5RT91585VP524725KK4WOVKQ","rel":"parent_payment","method":"GET"}]}}]}],"create_time":"2016-05-06T19:04:26Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-5RT91585VP524725KK4WOVKQ","rel":"self","method":"GET"}],"httpStatusCode":200}
```

The transaction has been completed. You'll want to review the [controllers/index.js](controllers/index.js) file for more info.
