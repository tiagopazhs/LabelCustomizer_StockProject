const express = require('express');
const app = express();
const router = require("express").Router();
const https = require('https')
const axios = require('axios')
const url = "https://bling.com.br/b"
const apiKey = "31504fef3824785bc4c7baabbf332d8d146b533eb7a517632ec18573ae351d3964353a70"
let date = new Date();
let day = ("00" + date.getDate()).slice(-2);
let month = ("00" + (date.getMonth()+1)).slice(-2);
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;

//create an instane to solve cors problems
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

//Get requisiton, of all orders.
router.get('/', async (req, res) => {
  try{
    // const {data:pedidos} =  await axios.get(`${url}/Api/v2/pedido/174186/json?apikey=${apiKey}`);
    let numberPage = 1
    let ordersList = []
    let i = 0;
    let run = true
    
    //Concat all orders requisions
    while (run) {
      const {data} = await axios.get(`${url}/Api/v2/pedidos/page=${numberPage}/json?apikey=${apiKey}&filters=dataEmissao[06/11/2022TO09/11/2022]`); //&filters=dataEmissao[01/11/2022TO03/11/2022];idSituacao[9]
      let ordersData = data.retorno.pedidos
      ordersList = ordersList.concat(ordersData)
      numberPage++;
      i++;
      if(ordersData.length<100){
        run = false
      }
    }

    let orderOutOfTime = 0
    limit = ordersList.length
    j = 0

    // verify how many orders is onTime
    while (j < limit){
      let orderObject = ordersList[j].pedido
      let pNumero = ordersList[j].pedido.numero
      let pLoja = ordersList[j].pedido.loja
      let pStatus = ordersList[j].pedido.situacao
      let pDataCriacao = ordersList[j].pedido.data
      if('nota' in orderObject) {
        pDataEnvio = ordersList[j].pedido.nota.dataEmissao;
      }else{
        pDataEnvio = currentDate
      }
      let pDataEnvioFormat = pDataEnvio.slice(0,10)
      let pTempoMs = new Date(pDataEnvioFormat) - new Date (pDataCriacao)
      let pTempo = pTempoMs / (1000 * 60 * 60 * 24)

      let pedidoFiltrado = {
        pNumero,
        pLoja,
        pStatus,
        pDataCriacao, 
        pDataEnvioFormat,
        pTempo
      }
      if (pTempo>2 && pStatus === 'Atendido'){
        orderOutOfTime++;
        console.log(pNumero, ' ', pStatus)
      }
      j++;
    }

    res.json(orderOutOfTime) // res.json(ordersList.length)
  }
  catch(err){
    console.log(err)
    res.json({err})
  }
})

module.exports = router

      // TRATAR PEDIDO:******************************
      // let pNumero = data.retorno.pedidos[0].pedido.numero
      // let pLoja = data.retorno.pedidos[0].pedido.loja
      // let pStatus = data.retorno.pedidos[0].pedido.situacao
      // let pDataCriacao = data.retorno.pedidos[0].pedido.data
      // let pDataEnvio = data.retorno.pedidos[0].pedido.nota.dataEmissao
      // let pDataEnvioFormat = pDataEnvio.slice(0,10)
      // let pTempoMs = new Date(pDataEnvioFormat) - new Date (pDataCriacao)
      // let pTempo = pTempoMs / (1000 * 60 * 60 * 24)

      // let pedidoFiltrado = {
      //   pNumero,
      //   pLoja,
      //   pStatus,
      //   pDataCriacao,
      //   pDataEnvioFormat,
      //   pTempo
      // }


        // TRATAR PEDIDO:******************************
      // let pNumero = ordersList[0].pedido.numero
      // let pLoja = ordersList[0].pedido.loja
      // let pStatus = ordersList[0].pedido.situacao
      // let pDataCriacao = ordersList[0].pedido.data
      // let pDataEnvio = ordersList[0].pedido.nota.dataEmissao
      // let pDataEnvioFormat = pDataEnvio.slice(0,10)
      // let pTempoMs = new Date(pDataEnvioFormat) - new Date (pDataCriacao)
      // let pTempo = pTempoMs / (1000 * 60 * 60 * 24)

      // let pedidoFiltrado = {
      //   pNumero,
      //   pLoja,
      //   pStatus,
      //   pDataCriacao,
      //   pDataEnvioFormat,
      //   pTempo
      // }