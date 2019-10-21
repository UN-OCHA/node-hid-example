// content of index.js
const http = require('http');
const url = require('url');
const port = 3000;

const requestHandler = async (request, response) => {
  const { Issuer, generators } = require('openid-client');
  try {
    // Step 1 : discover the OpenID Provider
    const hidIssuer = await Issuer.discover('https://api.dev.humanitarian.id');
    const client = new hidIssuer.Client({
      client_id: 'demoapp',
      client_secret: 'demopass',
      redirect_uris: ['http://localhost:3000'],
      response_types: ['code'],
    }); // => Client

    const myUrl = url.parse(request.url);
    const searchParams = new URLSearchParams(myUrl.query);
    const code = searchParams.get('code');
    if (code !== null) {
      // Step 3: Exchange code with access token and refresh token
      const params = client.callbackParams(request);
      console.log(params);
      let tokenSet = await client.callback('http://localhost:3000', params);
      console.log('received and validated tokens %j', tokenSet);
      console.log('validated ID Token claims %j', tokenSet.claims());
      // Step 4: Retrieve user info and display it as JSON
      let userinfo = await client.userinfo(tokenSet.access_token);
      response.writeHead(200, {"Content-Type": "application/json"});
      let json = JSON.stringify(userinfo);
      response.end(json);
    }
    else {
      // Step 2: Retrieve code
      let authUrl = client.authorizationUrl({
	      redirect_uri: 'http://localhost:3000',
        scope: 'profile',
        response_type: 'code',
      });
      response.writeHead(302, {
        'Location': authUrl,
      });
      response.end();
    }
  }
  catch (err) {
    console.log(err);
    response.end();
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
