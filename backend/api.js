require('dotenv').config();

const GerNet = require('./src/services/gerencianet');
const PaymentsTypes = require('./src/services/paymentsType');
// const Pessoa = require('./src/models/PersonModel');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/pessoas.db');

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

router.use((request,response,next)=>{
   next();
})

const reqGNAlready = GerNet.GNRequest({
  clientID: process.env.GN_CLIENT_ID_PROD,
  clientSecret: process.env.GN_CLIENT_SECRET_PROD
});

//GET Busca todas as pessoa cadastradas no banco de dados
router.route('/pessoas').get( async (request,response)=>{
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
  const currentDate = new Date();
  db.run('INSERT INTO PESSOAS (Nome, Email, Telefone, Instrumento, Descricao, createdAt) VALUES (?, ?, ?, ?, ?, ?)', 
  [add.Nome, add.Email, add.Telefone, add.Instrumento, add.Descricao, currentDate.toISOString().slice(0, 19).replace('T', ' ')], function (err) {
      if (err) {
          return res.status(500).json({ error: 'Erro ao inserir pessoa no banco de dados.' });
      }

      response.status(201).json(add);
  });
})

//POST Faz o processo de geração de pagamento com o valor específico
router.route('/inscricao/pagamento/:tipo').post( async (request,response) => {
    await GerNet.checkTokenExpiration()
    const reqGN = await reqGNAlready;

    let tipoPacote = request.params.tipo;
    let dataCob = await PaymentsTypes.generatePaymentOfType(tipoPacote);

    const cobResponse = await reqGN.post('/v2/cob', dataCob);
    const qrcodeResponse = await reqGN.get(`/v2/loc/${cobResponse.data.loc.id}/qrcode`);

    response.json(qrcodeResponse.data);
})

//GET Verifica se a pessoa pagou ou não via PIX
router.route('/verificacao/pessoa/:id').get( async (request,response)=>{
  try{
    await GerNet.checkTokenExpiration()
    const reqGN = await reqGNAlready;
    const requestPersonPayed = await reqGN.get(`/v2/cob/${request.params.id}`)
    response.json(requestPersonPayed.data);
  } catch(response){
    console.log(response.response.data);
  }
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Api rodando em: http://10.182.0.2:'+port);



