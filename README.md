# PayPal In-Context NodeJS App Samples

------

## Installing Dependencies

1. Fork and/or Clone this repo.
  * `$ git clone https://github.com/paypaldev/node-app-examples.git`
2. Run `$ cd node-app-examples`
3. Run `$ npm install`
4. Run `$ node install.js`

## API Setup

First go to [developer.paypal.com](https://developer.paypal.com/developer/applications/) to [Create a New App](https://developer.paypal.com/developer/applications/create).  

1. Login to [developer.paypal.com](https://developer.paypal.com/) with your PayPal Login and Password.
2. Click on [Dashboard](https://developer.paypal.com/developer/applications/) at the top.
3. Under "REST API apps" click on [Create App](https://developer.paypal.com/developer/applications/create)
4. Enter an "App Name" and select a sandbox *Business Account* to use.
5. You should now see your `Client ID` and a link to show your `Client Secret`. Click the Link to show the `Client Secret`.
6. In your terminal run `$ node setup.js`

When running `$ node setup.js` you'll be requested for your `client_id` and `client_secret`.  The application will collect those credentials and create a directory called `ppconfig` with a file `sandbox.json`.  Your credentials will be placed in that file for use with the API's.

Example of `ppconfig/sandbox.json`:

```json
{ 
	"client_id": "<YOUR_CLIENT_ID>", 
	"client_secret": "<YOUR_CLIENT_SECRET>"
}
```

> Note: If you'd like to change your credentials in the future, you can simply go into the file at `ppconfig/sandbox.json`.
> Or, simply re-run `$ node setup.js` from the `node-app-examples` directory. 

## Examples in this Repo

Currently these examples are setup to show the PayPal Express Checkout solution or the "PayPal Check Out" solution.  Other checkout methods and examples will be added in the near future.

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

Refer to the specific example's `README` for additional information.

1. First you'll need to `$ cd` or "Change Directory" into the directory of the app you'd like to run.
2. Run the appropriate start command as stated in the `README` in the app's directory.

Here's an example of the steps to run the `simple-express-server`:

1. Run `$ cd simple-express-server`
2. Run `$ node app.js`

## Contributing to this repo

Feel free to contribute to this repo, or file [issues](https://github.com/paypaldev/node-app-examples/issues) for any requests!