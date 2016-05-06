# PayPal In-Context NodeJS App Samples

------

## Using this repo

1. Fork and/or Clone this repo.
  * `$ git clone https://github.com/paypaldev/node-app-examples.git`
2. Run `$ cd node-app-examples`
3. Run `$ node install.js`
4. When prompted run `$ node setup.js`

When running `$ node setup.js` you'll be requested for your `client_id` and `client_secret`.  The application will collect those credentials and create a directory called `ppconfig` with a file `sandbox.json`.  Your credentials will be placed in that file for use with the API's.

Example of `ppconfig/sandbox.json`:

```json
{ 
	"client_id": "<YOUR_CLIENT_ID>", 
	"client_secret": "<YOUR_CLIENT_SECRET>"
}
```

## Examples in this Repo

1. [Simple-Express-Server](simple-express-server)
  * This is a very basic example of ExpressJS using PayPal API and Express Checkout.
2. [Express-In-Context](express-in-context/)
  * This is a progression from the [Simple-Express-Server](simple-express-server) app, in that it adds the [PayPal In-Context Experience](https://developer.paypal.com/webapps/developer/docs/classic/express-checkout/in-context/).
3. [Kraken-In-Context](kraken-in-context)
  * This is a basic example using [KrakenJS](http://krakenjs.com/) with the [PayPal In-Context Experience](https://developer.paypal.com/webapps/developer/docs/classic/express-checkout/in-context/).
4. [Kraken-Angular-In-Context](kraken-angular-in-context)
  * This is a progression from the [Kraken-In-Context](kraken-in-context) app, adding in [AngularJS](https://angularjs.org/) for the front-end APIs.
5. [Hapi-In-Context](hapi-in-context)
  * This is a simple example using [HapiJS](http://hapijs.com/) with the [PayPal In-Context Experience](https://developer.paypal.com/webapps/developer/docs/classic/express-checkout/in-context/).


## Running specific examples

1. Run `$ cd simple-express-server`
2. Run `$ node app.js`

Refer to the specific example's README for additional information.

## Contributing to this repo

Feel free to contribute to this repo, or file [issues](https://github.com/paypaldev/node-app-examples/issues) for any requests!