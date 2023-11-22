
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

const cert = fs.readFileSync(
  path.resolve(__dirname, `../certs/producao-522327-louvor-harmonia-prod.p12`)
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

router.use((request,response,next)=>{
   next();
})

const reqGNAlready = GNRequest({
    clientID: "Client_Id_1fb3f06eba68669cc89bc85613c93fe5e0886e02",
    clientSecret: "Client_Secret_4fad38d6540b9791f19553bf476fcb41222f9141"
});

//GET
router.route('/pessoas').get((request,response)=>{

    db.all('SELECT * FROM PESSOAS', (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        response.json(rows);
      });
})

//POST
router.route('/inscricao/pessoa').post(async (request, response) => {
    let add = {...request.body}
    db.run('INSERT INTO PESSOAS (Nome, Email, Telefone, Instrumento, Descricao) VALUES (?, ?, ?, ?, ?)', [add.Nome, add.Email, add.Telefone, add.Instrumento, add.Descricao], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Erro ao inserir pessoa no banco de dados.' });
        }

        response.status(201).json(add);
    });
})

//POST
router.route('/inscricao/pagamento').post( async (request,response) => {
    const reqGN = await reqGNAlready;
    const dataCob = {
        calendario: {
            expiracao: 3600
        },
        valor: {
            original: '1.00'
        },
        chave: 'ec657c56-39ce-405b-bc0e-945398257665',
        solicitacaoPagador: 'Cobrança dos serviços prestados.'
    };

    const cobResponse = await reqGN.post('/v2/cob', dataCob);
    const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

    response.json(qrcodeResponse.data);
})

//POST
app.post('/webhook(/pix)?', (req, res) => {
    console.log(req.body);
    res.send('200');
});


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Api rodando em: http://localhost:'+port);



