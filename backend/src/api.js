
const dboperations = require('./controllers/louvorHarmonia');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('C:\\Users\\Uriel\\Documents\\Musica LH Project\\backend\\database\\pessoas.db');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response, request } = require('express');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');

let tokenExpirationTime = null;

const cert = fs.readFileSync(
  path.resolve(__dirname, `../certs/homologacao-522327-louvorharmonia-dev.p12`)
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
    url: `https://pix-h.api.efipay.com.br/oauth/token`,
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


const reAuthenticationApi = async (clientID, clientSecret) => {
  let reAuthenticationCredentials = {clientID, clientSecret}
  const authResponse = await authenticate(reAuthenticationCredentials);
  const accessToken = authResponse.data?.access_token;
  tokenExpirationTime = Date.now() + 3600 * 1000;

  return axios.create({
    baseURL: "https://pix-h.api.efipay.com.br",
    httpsAgent: agent,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
  
}

const GNRequest = async (credentials) => {
  const authResponse = await authenticate(credentials);
  const accessToken = authResponse.data?.access_token;
  tokenExpirationTime = Date.now() + 3600 * 1000;
  return axios.create({
    baseURL: "https://pix-h.api.efipay.com.br",
    httpsAgent: agent,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });
}

router.use((request,response,next)=>{
   next();
})

// Configuração de verificação se o token já foi expirado
const checkTokenExpiration = async (req, res) => {
  let dateTime = Date.now();
  let expiration = tokenExpirationTime - 300000;
  if (dateTime > expiration) { 
    console.log('entrou aqui!!!');
    await reAuthenticationApi("Client_Id_e861682571704c787b3712c5ffd5a8b08a850c41", "Client_Secret_ff3c5dbfb39ee8cc8dc23b9f64512c6509d832eb");
  }
};

const reqGNAlready = GNRequest({
    clientID: "Client_Id_e861682571704c787b3712c5ffd5a8b08a850c41",
    clientSecret: "Client_Secret_ff3c5dbfb39ee8cc8dc23b9f64512c6509d832eb"
});

//GET Busca todas as pessoa cadastradas no banco de dados
router.route('/pessoas').get((request,response)=>{

    db.all('SELECT * FROM PESSOAS', (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        response.json(rows);
      });
})

//POST Cria a pessoa de fato no banco de dados
router.route('/inscricao/pessoa').post(async (request, response) => {
    let add = {...request.body}
    db.run('INSERT INTO PESSOAS (Nome, Email, Telefone, Instrumento, Descricao) VALUES (?, ?, ?, ?, ?)', 
      [add.Nome, add.Email, add.Telefone, add.Instrumento, add.Descricao], 
      function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao inserir pessoa no banco de dados.' });
        }

        response.status(201).json(add);
    });
})

//POST Faz o processo de geração de pagamento com o valor específico
router.route('/inscricao/pagamento/:tipo').post( async (request,response) => {
    await checkTokenExpiration()
    const reqGN = await reqGNAlready;
    let tipoPacote = request.params.tipo;
    let dataCob = null;
    switch (tipoPacote) {
      case '1':
        dataCob = {
          calendario: {
            expiracao: 3600
          },
          valor: {
            original: '0.01'
          },
          chave: 'ec657c56-39ce-405b-bc0e-945398257665',
          solicitacaoPagador: 'Cobrança dos serviços prestados.'
        };
        break;
    
      case '2':
        dataCob = {
          calendario: {
            expiracao: 3600
          },
          valor: {
            original: '0.02'
          },
          chave: 'ec657c56-39ce-405b-bc0e-945398257665',
          solicitacaoPagador: 'Cobrança dos serviços prestados.'
        };
        break;
    
      case '3':
        dataCob = {
          calendario: {
            expiracao: 3600
          },
          valor: {
            original: '0.03'
          },
          chave: 'ec657c56-39ce-405b-bc0e-945398257665',
          solicitacaoPagador: 'Cobrança dos serviços prestados.'
        };
        break;
    
      default:
        break;
    }

    const cobResponse = await reqGN.post('/v2/cob', dataCob);
    const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

    response.json(qrcodeResponse.data);
})

//GET Verifica se a pessoa pagou ou não via PIX
router.route('/verificacao/pessoa/:id').get( async (request,response)=>{
  try{
    await checkTokenExpiration()
    const reqGN = await reqGNAlready;
    const requestPersonPayed = await reqGN.get(`/v2/cob/${request.params.id}`)
    response.json(requestPersonPayed.data);
  } catch(response){
    console.log(response.response.data);
  }
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Api rodando em: http://localhost:'+port);



