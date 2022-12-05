const moment = require('moment');
moment.locale('pt-br');

//set holidays to exclude in deadline
const holidays = ["2022-10-28", "2022-11-02", "2022-11-15", "2022-12-08", "2022-12-25", "2023-01-01"]

//set items with a special dead line
const specialDeadLineItems = ["Personalização - Nome", "Personalização - Nome e Número", "Personalização - Número", "PRD00375", "PRD00484", "Personalização - Patchs", "PRD00503", "PRD00193"]

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

module.exports = { workDays, specialDeadLine }