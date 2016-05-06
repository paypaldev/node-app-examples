# Kraken-Angular-In-Context

-----

## Description

This app, is somewhat similar to the [Kraken-In-Context](../tree/master/kraken-in-context) application, except it adds in [AngularJS](https://angularjs.org/) to manage the front-end interactions with the API.  This allows you to interact with the Server asynchronously or via [AJAX](http://www.w3schools.com/ajax/).

## Using this app

After running the [install](../install.js) and [setup](../setup.js) follow these steps:

1. `$ cd kraken-angular-in-context`
2. `$ npm start`
3. Open your browser to [http://localhost:8000](http://localhost:8000)
4. Click the "PayPal Check Out" button on the page.

## Logs in the Terminal

In the terminal you will see the following:


```sh
----------------------------------------------------------
----------         PAYMENT_DETAILS OBJ          ----------
----------------------------------------------------------
{"intent":"sale","redirect_urls":{"return_url":"http://localhost:8000/return/#","cancel_url":"http://localhost:8000/cancel/#"},"payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description."}]}
----------------------------------------------------------
----------       ACCESS TOKEN RESPONSE          ----------
----------------------------------------------------------
"Bearer <YOUR GENERATED ACCESS TOKEN>"
----------------------------------------------------------
----------     CREATE PAYMENT RESPONSE          ----------
----------------------------------------------------------
{"id":"PAY-92G44094VY751773PK4WPGKQ","intent":"sale","state":"created","payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"description":"This is the payment transaction description.","related_resources":[]}],"create_time":"2016-05-06T19:40:26Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-92G44094VY751773PK4WPGKQ","rel":"self","method":"GET"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1M5463049D146960H","rel":"approval_url","method":"REDIRECT"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-92G44094VY751773PK4WPGKQ/execute","rel":"execute","method":"POST"}],"httpStatusCode":201}
------ Token Split ------
{ redirectUrl: 'https://www.sandbox.paypal.com/checkoutnow?token=EC-1M5463049D146960H',
  token: 'EC-1M5463049D146960H' }
----------------------------------------------------------
----------        RESPONSE TO ANGULAR           ----------
----------------------------------------------------------
{"redirectUrl":"https://www.sandbox.paypal.com/checkoutnow?token=EC-1M5463049D146960H","token":"EC-1M5463049D146960H"}
```

During the above, you would have seen your browser open the In-Context window to the `URL` as shown in the final output in the console.

In the mini-browser:

1. Login with your sandbox buyer account.
2. Click "Continue".
3. The mini-browser will close, and you will now be sent to the `return_url` as set in the `Create Payment` payload above.

In the terminal you will see the following:

```sh
----------------------------------------------------------
--------------  PAYMENT DETAILS REQUEST  ----------------
----------------------------------------------------------
{"paymentId":"PAY-92G44094VY751773PK4WPGKQ","token":"EC-1M5463049D146960H","PayerID":"N9DBPUZ67JDBC"}
----------------------------------------------------------
--------------  PAYMENT DETAILS RESPONSE  ----------------
----------------------------------------------------------
{"id":"PAY-92G44094VY751773PK4WPGKQ","intent":"sale","state":"created","cart":"1M5463049D146960H","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@website.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"408-520-5199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD"},"payee":{"email":"nodejs@rest.com"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[],"notify_url":"http://website.com/ipn/ipn_paypal.php"}],"redirect_urls":{"return_url":"http://localhost:8000/return/#?paymentId=PAY-92G44094VY751773PK4WPGKQ","cancel_url":"http://localhost:8000/cancel/#"},"create_time":"2016-05-06T19:40:26Z","update_time":"2016-05-06T19:40:38Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-92G44094VY751773PK4WPGKQ","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-92G44094VY751773PK4WPGKQ/execute","rel":"execute","method":"POST"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1M5463049D146960H","rel":"approval_url","method":"REDIRECT"}],"httpStatusCode":200}
```

At this point, the Payment Details are shown on the page, along with a button that says "Execute" payment.  This flow is commonly referred to as the "Continue Flow".  In a normal eCommerce scenario, at this point your application would provide options like Shipping Methods, or add on any required Taxes, or potentially upsell another product or service. 

Once you click the "Execute" button, you'll see the following in the terminal:

```sh
----------------------------------------------------------
---------------  EXECUTE PAYMENT REQUEST -----------------
----------------------------------------------------------
{"payer_id":"N9DBPUZ67JDBC"}
"PAY-92G44094VY751773PK4WPGKQ"
----------------------------------------------------------
---------------  EXECUTE PAYMENT RESPONSE ----------------
----------------------------------------------------------
{"id":"PAY-92G44094VY751773PK4WPGKQ","intent":"sale","state":"approved","cart":"1M5463049D146960H","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@sandersx.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"4085205199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"7.47","currency":"USD","details":{}},"payee":{"merchant_id":"MFUX86KBB6EM2"},"description":"This is the payment transaction description.","item_list":{"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[{"sale":{"id":"32U1662444284292M","state":"completed","amount":{"total":"7.47","currency":"USD","details":{}},"payment_mode":"INSTANT_TRANSFER","protection_eligibility":"ELIGIBLE","protection_eligibility_type":"ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE","transaction_fee":{"value":"0.52","currency":"USD"},"parent_payment":"PAY-92G44094VY751773PK4WPGKQ","create_time":"2016-05-06T19:40:47Z","update_time":"2016-05-06T19:40:47Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/sale/32U1662444284292M","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/sale/32U1662444284292M/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-92G44094VY751773PK4WPGKQ","rel":"parent_payment","method":"GET"}]}}]}],"create_time":"2016-05-06T19:40:48Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-92G44094VY751773PK4WPGKQ","rel":"self","method":"GET"}],"httpStatusCode":200}
```

The transaction has been completed. You'll want to review the Client and Server files in this repo for more info.
