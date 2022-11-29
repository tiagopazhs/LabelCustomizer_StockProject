const express = require('express');
const app = express();
const router = require("express").Router();
const https = require('https')
const axios = require('axios');
const { Console } = require('console');
const url = "https://bling.com.br/b"
const apiKey = "31504fef3824785bc4c7baabbf332d8d146b533eb7a517632ec18573ae351d3964353a70"
let date = new Date();
let day = ("00" + date.getDate()).slice(-2);
let month = ("00" + (date.getMonth() + 1)).slice(-2);
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


//interval to use between get requisitions. Limit of Bling: 3 requsitionts for second ad 120.000 for day.


//Get requisiton, of all orders.
router.get('/', async (req, res) => {
  try {
    // const {data:pedidos} =  await axios.get(`${url}/Api/v2/pedido/174186/json?apikey=${apiKey}`);
    let numberPage = 1
    let ordersList = []
    let i = 0;
    let run = true

    let pedidosAtendidos = []
    let pedidosCancelados = []
    let PedidosDevolvidos = []
    let outrosPedidos = []

    let daysTotalAtendidos = 0
    let daysTotalEmAberto = 0

    //Concat all orders requisions
    while (run) {
      const { data } = await axios.get(`${url}/Api/v2/pedidos/page=${numberPage}/json?apikey=${apiKey}&filters=dataEmissao[09/11/2022TO09/11/2022]`)//&filters=dataEmissao[01/11/2022TO03/11/2022];idSituacao[9]
      let ordersData = data.retorno.pedidos;
      ordersList = ordersList.concat(ordersData);
      numberPage++;
      i++;
      if (ordersData.length < 100) {
        run = false
      }
    }

    let orderOutOfTime = 0
    limit = ordersList.length
    j = 0

    //stores id: Loja do galo, Inter Store, MRV and Intertag.
    ordersListFilter = ["203619239", "203370950", "203994140", "203619241"]

    while (j < limit) {

      //variables to deal with ther orders fields
      let orderObject = ordersList[j].pedido
      let pNumero = ordersList[j].pedido.numero
      let pLoja = ordersList[j].pedido.loja
      let pStatus = ordersList[j].pedido.situacao
      let pDataCriacao = ordersList[j].pedido.data
      if ('nota' in orderObject) {
        pDataEnvio = ordersList[j].pedido.nota.dataEmissao;
      } else {
        pDataEnvio = currentDate
      }
      let pDataEnvioFormat = pDataEnvio.slice(0, 10)
      let pTempoMs = new Date(pDataEnvioFormat) - new Date(pDataCriacao)
      let pTempo = pTempoMs / (1000 * 60 * 60 * 24)

      //order fields
      let pedidoFiltrado = {
        pNumero,
        pLoja,
        pStatus,
        pDataCriacao,
        pDataEnvioFormat,
        pTempo
      }

      //verify the order status and group for situation & sum days in i each situation
      if (pStatus === 'Atendido' && ordersListFilter.includes(pLoja)) {
        pedidosAtendidos = pedidosAtendidos.concat(pedidoFiltrado);
        daysTotalAtendidos = daysTotalAtendidos + pTempo;
      } else if (pStatus === 'Cancelado' &&   ordersListFilter.includes(pLoja)) {
        pedidosCancelados = pedidosCancelados.concat(pedidoFiltrado)
      } else if (pStatus === 'Devolvido' && ordersListFilter.includes(pLoja)) {
        PedidosDevolvidos = PedidosDevolvidos.concat(pedidoFiltrado)
      } else if (ordersListFilter.includes(pLoja)) {
        outrosPedidos = outrosPedidos.concat(pedidoFiltrado);
        daysTotalEmAberto = daysTotalEmAberto + pTempo;
      }

      //verify how many orders are out of time and have been sended
      if (pTempo > 2 && pStatus === 'Atendido') {
        orderOutOfTime++;
      }
      j++;
    }

    let pedidosAtendidosOutOfTimeList = pedidosAtendidos.filter(pedidosAtendidos => pedidosAtendidos.pTempo > 2)
    let pedidosAtendidosOutOfTime = pedidosAtendidosOutOfTimeList.length
    let pedidosAtendidosOnTime = pedidosAtendidos.length - pedidosAtendidosOutOfTime
    let tempoMedioPedidosAtendido = daysTotalAtendidos / pedidosAtendidos.length

    let pedidosEmAbertoOutOfTimeList = outrosPedidos.filter(outrosPedidos => outrosPedidos.pTempo > 2)
    let pedidosEmAbertoOutOfTime = pedidosEmAbertoOutOfTimeList.length
    let pedidosEmAbertoOnTime = outrosPedidos.length - pedidosEmAbertoOutOfTime
    let tempoMedioPedidosEmAberto = daysTotalEmAberto / outrosPedidos.length

    result = {
      pedidosAtendidos,
      pedidosCancelados,
      PedidosDevolvidos,
      outrosPedidos,
      pedidosAtendidosOutOfTimeList,
      pedidosAtendidosOutOfTime,
      pedidosAtendidosOnTime,
      tempoMedioPedidosAtendido,
      pedidosEmAbertoOutOfTimeList,
      pedidosEmAbertoOutOfTime,
      pedidosEmAbertoOnTime,
      tempoMedioPedidosEmAberto
    }

    res.json(result) // res.json(ordersList.length)
  }
  catch (err) {
    console.log(err)
    res.json({ err })
  }
})

module.exports = router