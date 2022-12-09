// Variables to use in order requisition


const https = require('https')
const axios = require('axios');
const { Console } = require('console');
require('dotenv').config();
const apiKey = process.env.API_KEY
const url = "https://bling.com.br/b"

const moment = require('moment');
moment.locale('pt-br');

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

async function getRequest(page, start, end, openSituation) {

  let situation = ""
  
  if (openSituation) {
    start = new Date (start.slice(6, 10), start.slice(3, 5) - 1, start.slice(0, 2))
    situation = ";idSituacao[6,15,21,24,36574,37454,40594,40595,40870,48366]"
    end = moment(start).subtract(1, 'days').format('DD/MM/YYYY')
    start = "01/01/2022"
  }

  
  const { data } = await axios.get(`${url}/Api/v2/pedidos/page=${page}/json?apikey=${apiKey}&filters=dataEmissao[${start}TO${end}]${situation}`)

  return data.retorno.pedidos;

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

module.exports = { workDays, specialDeadLine, getRequest}