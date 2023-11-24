require('dotenv').config();

const GerNet = require('./src/services/gerencianet');
const Pessoa = require('./src/models/PersonModel');
const PaymentsTypes = require('./src/services/paymentsType');

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
  clientID: process.env.GN_CLIENT_ID,
  clientSecret: process.env.GN_CLIENT_SECRET
});

//GET Busca todas as pessoa cadastradas no banco de dados
router.route('/pessoas').get( async (request,response)=>{
   await Pessoa.findAll().then((fetchedData) => {
      response.json(fetchedData);
    });
})


//POST Cria a pessoa de fato no banco de dados
router.route('/inscricao/pessoa').post(async (request, response) => {
    let add = {...request.body}

    // Cria uma nova pessoa usando o modelo Pessoa
    await Pessoa.create({
      Nome: add.Nome,
      Email: add.Email,
      Telefone: add.Telefone,
      Instrumento: add.Instrumento,
      Descricao: add.Descricao
    }).then((createdDatabase) => {
      createdDatabase.save()
      response.json(createdDatabase)
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
console.log('Api rodando em: http://localhost:'+port);



