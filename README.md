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

## Running specific examples

1. Run `$ cd simple-express-server`
2. Run `$ node app.js`

Refer to the specific example's README for additional information.

## Contributing to this repo

Feel free to contribute to this repo, or file [issues](https://github.com/paypaldev/node-app-examples/issues) for any requests!