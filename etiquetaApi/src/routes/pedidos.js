const express = require('express');
const app = express();

const https = require('https')
const axios = require('axios')
const url = "https://bling.com.br/b"
const apiKey = "31504fef3824785bc4c7baabbf332d8d146b533eb7a517632ec18573ae351d3964353a70"

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

const router = require("express").Router();

//Fazer requisição de todos pedidos por paginação
// function tabelaPedidosCompleta

//Get requisiton, it can be get this table: historyLabel.
router.get('/', async (req, res) => {
  try{
    // const {data:pedidos} =  await axios.get(`${url}/Api/v2/pedido/174186/json?apikey=${apiKey}`);
    let numberPage = 1
    const {data} =  await axios.get(`${url}/Api/v2/pedidos/page=${numberPage}/json?apikey=${apiKey}&filters=dataEmissao[01/11/2022TO30/11/2022]`);
    let listapedidos = []
    let teste = []

    let pedidosResult = data.retorno.pedidos
    let i = 0;
    while (i < 30) {
      // console.log('concatenar isso: ',[pedidosResult])
      teste = listapedidos.concat(pedidosResult)
      listapedidos = teste
      // listapedidos += [pedidosResult]+"," ;
      console.log('Rodada: ', i);
      numberPage++;
      i++;
      // console.log(len(listapedidos))
    }
    // res.json(listapedidos.length)
    res.json(listapedidos)
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