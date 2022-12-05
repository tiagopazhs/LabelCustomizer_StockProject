// Variables to use in order requisition
const express = require('express');
const app = express();
const router = require("express").Router();
const https = require('https')
const axios = require('axios');
const { Console } = require('console');
const url = "https://bling.com.br/b"

require('dotenv').config();
const apiKey = process.env.API_KEY

const moment = require('moment');
moment.locale('pt-br');

const { workDays, specialDeadLine } = require('../utils');

//stores id: Loja do galo, Inter Store, MRV and Intertag.
const storeFilter = ["203619239", "203370950", "203994140", "203619241"]

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
  try {

    // arrays to receive the orders 
    let ordersData = []
    let ordersList = []
    let orderObject = []
    let ordersListFilter = []
    let ordersResult = []
    let pedidoTratado = []

    // set variables to build the result of the request
    let pNumero = ""
    let pLoja = ""
    let pStatus = ""
    let pCliente = ""
    let pDataCriacao = 0
    let pDataEnvioFormat = 0
    let pItens = []
    let pPrazoEspecial = ""
    let pTempo = 0
    let pTempoAtraso = 0
    let pTransportadora = ""

    // while aux variables
    let j = 0
    let i = 0
    let k = 0
    let run = true
    let aut = true
    let times = 0
    let currentSecond = -1
    let pageNumber = 1
    let sub = 0

    //Concat all orders requisions
    while (run) {

      // Verify if the current second is equal the auxiliar variable. Authorize if it is not equal.
      if (currentSecond != (new Date().getSeconds())) {
        currentSecond = (new Date().getSeconds())
        times = 0
        aut = true
      }

      // Authorize the requisition to run just 2 times for second
      if (aut) {
        const { data } = await axios.get(`${url}/Api/v2/pedidos/page=${pageNumber}/json?apikey=${apiKey}&filters=dataEmissao[05/12/2022TO30/12/2022]`)//&filters=dataEmissao[01/11/2022TO03/11/2022];idSituacao[9]
        ordersData = data.retorno.pedidos;
        ordersList = ordersList.concat(ordersData);
        pageNumber++;
        i++;
        times++
        if (times > 2) { aut = false }
        console.log('requisição pedidos de: ', i - 1, '00  a  ', i, '00. Realizado no segundo: ', currentSecond)
        if (ordersData.length < 100) { run = false; console.log('requisição completa') }
      }
    }

    // filter orders by stores
    while (k < ordersList.length) {
      if (storeFilter.includes(ordersList[k].pedido.loja))
        ordersListFilter = ordersListFilter.concat(ordersList[k])
      k++
    }

    //variables to deal with orders fields
    while (j < ordersListFilter.length) {

      orderObject = ordersListFilter[j].pedido

      pNumero = ordersListFilter[j].pedido.numero
      pLoja = ordersListFilter[j].pedido.loja
      pStatus = ordersListFilter[j].pedido.situacao
      pCliente = ordersListFilter[j].pedido.cliente.nome
      pDataCriacao = ordersListFilter[j].pedido.data
      if ('nota' in orderObject) {
        pDataEnvio = ordersListFilter[j].pedido.nota.dataEmissao;
      } else {
        pDataEnvio = moment().format('YYYY-MM-DD')
      }
      pItens = ordersListFilter[j].pedido.itens
      pPrazoEspecial = specialDeadLine(pItens)
      pTempo = workDays(pDataCriacao, pDataEnvio)
      if(pPrazoEspecial){sub = 4}else{sub = 2}
      if(pTempo - sub < 1 ){pTempoAtraso = 0}else{pTempoAtraso = pTempo - sub}
      if (ordersListFilter[j].pedido.transporte.transportadora != undefined) { pTransportadora = ordersListFilter[j].pedido.transporte.transportadora } else { pTransportadora = 'correios' }
      
      //order fields
      pedidoTratado = {
        pNumero,
        pLoja,
        pStatus,
        pCliente,
        pDataCriacao,
        pDataEnvioFormat,
        pItens,
        pPrazoEspecial,
        pTempo,
        pTempoAtraso,
        pTransportadora,
      }

      ordersResult = ordersResult.concat(pedidoTratado);
      j++;
    }

    result = ordersResult

    res.json(result) // res.json(ordersList.length)
  }
  catch (err) {
    console.log(err)
    res.json({ err })
  }
})

module.exports = router