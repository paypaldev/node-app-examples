# Express-In-Context

-----

## Description

This app, is very similar to the [simple-express-server](../simple-express-server) example, except it adds the component of using the [PayPal In-Context Checkout Experience](https://developer.paypal.com/webapps/developer/docs/classic/express-checkout/in-context/).

## Using this app

After running the [install](../install.js) and [setup](../setup.js) follow these steps:

1. `$ cd express-in-context`
2. `$ node app.js`
3. Open your browser to [http://localhost:3000](http://localhost:3000)
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
{"intent":"sale","redirect_urls":{"return_url":"http://localhost:3000/return","cancel_url":"http://localhost:3000/cancel"},"payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description."}]}
----------------------------------------------------------
----------     CREATE PAYMENT RESPONSE          ----------
----------------------------------------------------------
{"id":"PAY-7LE44599CU719633PK4V4XYQ","intent":"sale","state":"created","payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description.","related_resources":[]}],"create_time":"2016-05-05T22:40:33Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7LE44599CU719633PK4V4XYQ","rel":"self","method":"GET"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-4LR01220TB4788445","rel":"approval_url","method":"REDIRECT"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7LE44599CU719633PK4V4XYQ/execute","rel":"execute","method":"POST"}],"httpStatusCode":201}
------ Token Split ------
{ redirectUrl: 'https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-4LR01220TB4788445',
  token: 'EC-4LR01220TB4788445' }
----------------------------------------------------------
----------          REDIRECTING USER            ----------
----------------------------------------------------------
https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-4LR01220TB4788445
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
{"paymentId":"PAY-7LE44599CU719633PK4V4XYQ","token":"EC-4LR01220TB4788445","PayerID":"N9DBPUZ67JDBC"}
----------------------------------------------------------
----------             PAYMENT DETAILS          ----------
----------------------------------------------------------
{"id":"PAY-7LE44599CU719633PK4V4XYQ","intent":"sale","state":"created","cart":"4LR01220TB4788445","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@sandersx.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"408-520-5199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"payee":{"email":"nodejs@rest.com"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[],"notify_url":"http://sandersx.com/ipn/ipn_paypal.php"}],"redirect_urls":{"return_url":"http://localhost:3000/return?paymentId=PAY-7LE44599CU719633PK4V4XYQ","cancel_url":"http://localhost:3000/cancel"},"create_time":"2016-05-05T22:40:33Z","update_time":"2016-05-05T22:40:44Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7LE44599CU719633PK4V4XYQ","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7LE44599CU719633PK4V4XYQ/execute","rel":"execute","method":"POST"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-4LR01220TB4788445","rel":"approval_url","method":"REDIRECT"}],"httpStatusCode":200}
----------------------------------------------------------
----------      PAYMENT COMPLETED DETAILS       ----------
----------------------------------------------------------
{"id":"PAY-7LE44599CU719633PK4V4XYQ","intent":"sale","state":"approved","cart":"4LR01220TB4788445","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@sandersx.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"4085205199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD","details":{}},"payee":{"merchant_id":"MFUX86KBB6EM2"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[{"sale":{"id":"6LE62809A6077204J","state":"completed","amount":{"total":"7.47","currency":"USD","details":{}},"payment_mode":"INSTANT_TRANSFER","protection_eligibility":"ELIGIBLE","protection_eligibility_type":"ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE","transaction_fee":{"value":"0.52","currency":"USD"},"parent_payment":"PAY-7LE44599CU719633PK4V4XYQ","create_time":"2016-05-05T22:40:45Z","update_time":"2016-05-05T22:40:45Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/sale/6LE62809A6077204J","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/sale/6LE62809A6077204J/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7LE44599CU719633PK4V4XYQ","rel":"parent_payment","method":"GET"}],"soft_descriptor":"PAYPAL *NODEJSRESTS"}}]}],"create_time":"2016-05-05T22:40:45Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7LE44599CU719633PK4V4XYQ","rel":"self","method":"GET"}],"httpStatusCode":200}
```

The transaction has been completed. You'll want to review the [app.js](app.js) file for more info.