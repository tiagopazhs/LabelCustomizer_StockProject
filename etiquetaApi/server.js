const express = require('express');
const app = express();
const cors = require('cors');
const HTTP_PORT = 8500;
const mongoose = require('mongoose');


//User env file to enter with password
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

require('dotenv').config();
app.use(express.json());
app.use(cors());

const labelHis = require('./src/routes/labelHis')
const labelExec = require('./src/routes/labelExec')

const https = require('https')
const axios = require('axios')
const url = "https://bling.com.br/b"
const apiKey = "31504fef3824785bc4c7baabbf332d8d146b533eb7a517632ec18573ae351d3964353a70"

// forma de ler JSON / middlewares
app.use(express.urlencoded({
  extended: true,
}),
)

app.use('/historic', labelHis)
app.use('/procces', labelExec)

const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false,
      withCredentials: false,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Headers': 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
  })
});

//End point: initial route
app.get('/teste', async (req, res) => {

  try{
    const {data:pedidos} =  await axios.get(`${url}/Api/v2/pedidos/page=1/json?apikey=${apiKey}`);
      // console.log(pedidos,' pedidos')
    console.log(pedidos)
      // res.json({message: 'we are on end point!'})
      res.json(pedidos)
    }
  catch(err){
    console.log(err)
    res.json({err})
  }
  })


//conect to mongoDB
mongoose.connect(
  `mongodb://tiagopazhs:Aani0607@ac-xb501ws-shard-00-00.ibx1tea.mongodb.net:27017,ac-xb501ws-shard-00-01.ibx1tea.mongodb.net:27017,ac-xb501ws-shard-00-02.ibx1tea.mongodb.net:27017/?ssl=true&replicaSet=atlas-jxxop3-shard-0&authSource=admin&retryWrites=true&w=majority`
)
.then(() => {
  console.log('MongoDb are connected!')
  app.listen(HTTP_PORT)
})
.catch((err) => console.log(err));
