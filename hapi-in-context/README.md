# Hapi-In-Context

-----

## Description

This is a basic [HapiJS](http://hapijs.com) example with [Bootstrap](http://getbootstrap.com/) for PayPal In-Context.  

## Using this app

After running the [install](../install.js) and [setup](../setup.js), follow these steps:

1. `$ cd hapi-in-context`
2. `$ node server.js`
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
{"intent":"sale","redirect_urls":{"return_url":"http://localhost:8000/return","cancel_url":"http://localhost:8000/cancel"},"payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"15.00","currency":"USD","details":{"shipping":"2.00","subtotal":"13.00","tax":"0.00","handling_fee":"0.00","insurance":"0.00","shipping_discount":"0.00"}},"description":"My Payment Description","invoice_number":"ABCDEFGHIJK1462570373051","item_list":{"items":[{"quantity":"1","name":"Item 0 Name","price":"7.00","currency":"USD","sku":"ABCDEFGHIJKL987654321","description":"Item 0 Description","tax":"0.00"},{"quantity":"1","name":"Item 1 Name","price":"2.00","currency":"USD","sku":"ABCDEFGHIJKL987654322","description":"Item 1 Description","tax":"0.00"},{"quantity":"1","name":"Item 2 Name","price":"2.00","currency":"USD","sku":"ABCDEFGHIJKL987654323","description":"Item 2 Description","tax":"0.00"},{"quantity":"1","name":"Item 3 Name","price":"2.00","currency":"USD","sku":"ABCDEFGHIJKL987654324","description":"Item 3 Description","tax":"0.00"}]}}]}
----------------------------------------------------------
----------     CREATE PAYMENT RESPONSE          ----------
----------------------------------------------------------
{"id":"PAY-7T659107JP828802SK4WQ3BQ","intent":"sale","state":"created","payer":{"payment_method":"paypal"},"transactions":[{"amount":{"total":"15.00","currency":"USD","details":{"subtotal":"13.00","tax":"0.00","shipping":"2.00","insurance":"0.00","handling_fee":"0.00","shipping_discount":"0.00"}},"description":"My Payment Description","invoice_number":"ABCDEFGHIJK1462570373051","item_list":{"items":[{"name":"Item 0 Name","sku":"ABCDEFGHIJKL987654321","description":"Item 0 Description","price":"7.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 1 Name","sku":"ABCDEFGHIJKL987654322","description":"Item 1 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 2 Name","sku":"ABCDEFGHIJKL987654323","description":"Item 2 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 3 Name","sku":"ABCDEFGHIJKL987654324","description":"Item 3 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1}]},"related_resources":[]}],"create_time":"2016-05-06T21:32:53Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7T659107JP828802SK4WQ3BQ","rel":"self","method":"GET"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0DD952980E042811C","rel":"approval_url","method":"REDIRECT"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7T659107JP828802SK4WQ3BQ/execute","rel":"execute","method":"POST"}],"httpStatusCode":201}
------ Token Split ------
{ redirectUrl: 'https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-0DD952980E042811C',
  token: 'EC-0DD952980E042811C' }
----------------------------------------------------------
----------          REDIRECTING USER            ----------
----------------------------------------------------------
https://www.sandbox.paypal.com/checkoutnow?useraction=commit&token=EC-0DD952980E042811C
```

During the above, you would have seen your browser open the In-Context window to the `URL` as shown in the final output in the console.

In the mini-browser:

1. Login with your sandbox buyer account.
2. Click "Pay Now".
3. The mini-browser will close, and you will now be sent to the `return_url` as set in the `Create Payment` payload above.

In the terminal you will see the following:

```sh
----------------------------------------------------------
----------             PAYMENT DETAILS          ----------
----------------------------------------------------------
{"id":"PAY-7T659107JP828802SK4WQ3BQ","intent":"sale","state":"created","cart":"0DD952980E042811C","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@website.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"408-520-5199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"15.00","currency":"USD","details":{"subtotal":"13.00","tax":"0.00","shipping":"2.00","insurance":"0.00","handling_fee":"0.00","shipping_discount":"0.00"}},"payee":{"email":"nodejs@rest.com"},"description":"My Payment Description","invoice_number":"ABCDEFGHIJK1462570373051","item_list":{"items":[{"name":"Item 0 Name","sku":"ABCDEFGHIJKL987654321","description":"Item 0 Description","price":"7.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 1 Name","sku":"ABCDEFGHIJKL987654322","description":"Item 1 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 2 Name","sku":"ABCDEFGHIJKL987654323","description":"Item 2 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 3 Name","sku":"ABCDEFGHIJKL987654324","description":"Item 3 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1}],"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[],"notify_url":"http://website.com/ipn/ipn_paypal.php"}],"redirect_urls":{"return_url":"http://localhost:8000/return?paymentId=PAY-7T659107JP828802SK4WQ3BQ","cancel_url":"http://localhost:8000/cancel"},"create_time":"2016-05-06T21:32:53Z","update_time":"2016-05-06T21:33:04Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7T659107JP828802SK4WQ3BQ","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7T659107JP828802SK4WQ3BQ/execute","rel":"execute","method":"POST"},{"href":"https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0DD952980E042811C","rel":"approval_url","method":"REDIRECT"}],"httpStatusCode":200}
----------------------------------------------------------
----------      PAYMENT COMPLETED DETAILS       ----------
----------------------------------------------------------
{"id":"PAY-7T659107JP828802SK4WQ3BQ","intent":"sale","state":"approved","cart":"0DD952980E042811C","payer":{"payment_method":"paypal","status":"VERIFIED","payer_info":{"email":"nate-buyer@website.com","first_name":"Test","last_name":"Buyer","payer_id":"N9DBPUZ67JDBC","shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"phone":"4085205199","country_code":"US","billing_address":{"line1":"1 Main St","line2":"","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}}},"transactions":[{"amount":{"total":"15.00","currency":"USD","details":{"subtotal":"13.00","tax":"0.00","shipping":"2.00","insurance":"0.00","handling_fee":"0.00","shipping_discount":"0.00"}},"payee":{"merchant_id":"MFUX86KBB6EM2"},"description":"My Payment Description","item_list":{"items":[{"name":"Item 0 Name","sku":"ABCDEFGHIJKL987654321","description":"Item 0 Description","price":"7.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 1 Name","sku":"ABCDEFGHIJKL987654322","description":"Item 1 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 2 Name","sku":"ABCDEFGHIJKL987654323","description":"Item 2 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1},{"name":"Item 3 Name","sku":"ABCDEFGHIJKL987654324","description":"Item 3 Description","price":"2.00","currency":"USD","tax":"0.00","quantity":1}],"shipping_address":{"recipient_name":"Test Buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"}},"related_resources":[{"sale":{"id":"5KL129924A269523E","state":"completed","amount":{"total":"15.00","currency":"USD","details":{}},"payment_mode":"INSTANT_TRANSFER","protection_eligibility":"ELIGIBLE","protection_eligibility_type":"ITEM_NOT_RECEIVED_ELIGIBLE,UNAUTHORIZED_PAYMENT_ELIGIBLE","transaction_fee":{"value":"0.74","currency":"USD"},"parent_payment":"PAY-7T659107JP828802SK4WQ3BQ","create_time":"2016-05-06T21:33:05Z","update_time":"2016-05-06T21:33:05Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/sale/5KL129924A269523E","rel":"self","method":"GET"},{"href":"https://api.sandbox.paypal.com/v1/payments/sale/5KL129924A269523E/refund","rel":"refund","method":"POST"},{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7T659107JP828802SK4WQ3BQ","rel":"parent_payment","method":"GET"}]}}]}],"create_time":"2016-05-06T21:33:06Z","links":[{"href":"https://api.sandbox.paypal.com/v1/payments/payment/PAY-7T659107JP828802SK4WQ3BQ","rel":"self","method":"GET"}],"httpStatusCode":200}
```

The transaction has been completed. You'll want to review the [server.js](server.js) file for more info.
