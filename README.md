# Example HID client in Node.JS

This repository provides an example HID client application written in Javascript, using Node.JS and the [openid-client](https://www.npmjs.com/package/openid-client) library.

## Running the application

1. Make sure you have a valid user account on [the HID dev environment](https://api.dev.humanitarian.id)
2. Run the application using `node index.js`
3. Point your browser to http://localhost:3000. The application should redirect you to the login page on the HID dev environment.
4. Log in using your user account
5. You should be redirected to localhost, and should see the information retrieved from HID (user account in your browser, access token and refresh tokens in your console...)
