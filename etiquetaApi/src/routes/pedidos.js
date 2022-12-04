// Variables to use in order requisition
const express = require('express');
const app = express();
const router = require("express").Router();
const https = require('https')
const axios = require('axios');
const { Console } = require('console');
const url = "https://bling.com.br/b"
const apiKey = "31504fef3824785bc4c7baabbf332d8d146b533eb7a517632ec18573ae351d3964353a70"

const moment = require('moment')
moment.locale('pt-br');

//stores id: Loja do galo, Inter Store, MRV and Intertag.
const storeFilter = ["203619239", "203370950", "203994140", "203619241"]

//set holidays to exclude in deadline
const holidays = ["2022-10-28", "2022-11-02", "2022-11-15", "2022-12-08", "2022-12-25", "2023-01-01"]

//set items with a special dead line
const specialDeadLineItems = ["Personalização - Nome", "Personalização - Nome e Número", "Personalização - Número", "PRD00375", "PRD00484", "Personalização - Patchs", "PRD00503", "PRD00193"]

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

    // set variables to build the result of the request
    let pNumero = ""
    let pLoja = ""
    let pStatus = ""
    let pDataCriacao = 0
    let pDataEnvioFormat = 0
    let pTempo = 0
    let pTransportadora = ""
    let pItens = []
    let pPrazoEspecial = ""

    //set orders by status
    let pedidosAtendidos = []
    let pedidosCancelados = []
    let PedidosDevolvidos = []
    let outrosPedidos = []
    let pedidoTratado = []

    // while aux variables
    let j = 0
    let i = 0
    let k = 0
    let run = true
    let aut = true
    let times = 0
    let currentSecond = -1
    let pageNumber = 1

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
        const { data } = await axios.get(`${url}/Api/v2/pedidos/page=${pageNumber}/json?apikey=${apiKey}&filters=dataEmissao[14/11/2022TO20/11/2022]`)//&filters=dataEmissao[01/11/2022TO03/11/2022];idSituacao[9]
        ordersData = data.retorno.pedidos;
        ordersList = ordersList.concat(ordersData);
        pageNumber++;
        i++;
        times++
        if (times > 2) { aut = false }
        // console.log('requisição pedidos de: ', i - 1, '00  a  ', i, '00. Realizado no segundo: ', currentSecond)
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
      pDataCriacao = ordersListFilter[j].pedido.data
      if ('nota' in orderObject) {
        pDataEnvio = ordersListFilter[j].pedido.nota.dataEmissao;
      } else {
        pDataEnvio = moment().format('YYYY-MM-DD')
      }
      pTempo = workDays(pDataCriacao, pDataEnvio)
      if (ordersListFilter[j].pedido.transporte.transportadora != undefined) { pTransportadora = ordersListFilter[j].pedido.transporte.transportadora } else { pTransportadora = 'correios' }
      pItens = ordersListFilter[j].pedido.itens
      pPrazoEspecial = specialDeadLine(pItens)

      //order fields
      pedidoTratado = {
        pNumero,
        pLoja,
        pStatus,
        pDataCriacao,
        pDataEnvioFormat,
        pTempo,
        pTransportadora,
        pItens,
        pPrazoEspecial,
      }

      ordersResult = ordersResult.concat(pedidoTratado);

      //verify the order status and group for situation & sum days in each situation
      if (pStatus === 'Atendido') {
        pedidosAtendidos = pedidosAtendidos.concat(pedidoTratado);
      } else if (pStatus === 'Cancelado') {
        pedidosCancelados = pedidosCancelados.concat(pedidoTratado)
      } else if (pStatus === 'Devolvido') {
        PedidosDevolvidos = PedidosDevolvidos.concat(pedidoTratado)
      } else {
        outrosPedidos = outrosPedidos.concat(pedidoTratado);
      }
      j++;
    }

    result = {
      ordersResult, 
      pedidosAtendidos,
      pedidosCancelados,
      PedidosDevolvidos,
      outrosPedidos,
    }

    res.json(result) // res.json(ordersList.length)
  }
  catch (err) {
    console.log(err)
    res.json({ err })
  }
})

function specialDeadLine(items) {
  let special = false
  let whAux = 0
  let itemCode = ""

  while (whAux < items.length) {
    itemCode = items[whAux].item.codigo;
    if (specialDeadLineItems.indexOf(itemCode) != -1) {
      special = true
    }
    whAux++
  }
  return special
}

function workDays(dInitital, dEnd) {
  let initial = moment(dInitital)
  let end = moment(dEnd)
  let result = 0
  let numDiaSemana = 0
  let jobDays = 0
  let whAux = 0

  result = end.diff(initial, 'days');

  while (whAux < result) {
    initial = initial.add(1, 'days')
    numDiaSemana = initial.day()
    if (numDiaSemana != 0 && numDiaSemana != 6) {
      jobDays++
    }
    whAux++
  }

  let holiday = ""
  whAux = 0
  while (whAux < holidays.length) {
    holiday = holidays[whAux]
    if (moment(holiday).isBetween(initial, end)) {
      jobDays--
    }
    whAux++
  }

  return jobDays
}

module.exports = router