
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');

const cert = fs.readFileSync(
  path.resolve(__dirname, `../../certs/producao-522327-louvor-harmonia-prod.p12`)
);

const agent = new https.Agent({
  pfx: cert,
  passphrase: ''
});

const authenticate = ({ clientID, clientSecret }) => {
  const credentials = Buffer.from(
    `${clientID}:${clientSecret}`
  ).toString('base64');

  return axios({
    method: 'POST',
    url: `https://pix.api.efipay.com.br/oauth/token`,
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json'
    },
    httpsAgent: agent,
    data: {
      grant_type: 'client_credentials'
    }
  });
};


const GNRequest = async (credentials) => {
  const authResponse = await authenticate(credentials);
  const accessToken = authResponse.data?.access_token;

  return axios.create({
    baseURL: "https://pix.api.efipay.com.br",
    httpsAgent: agent,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
}

module.exports = GNRequest;