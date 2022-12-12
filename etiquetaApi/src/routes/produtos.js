const express = require('express');
const app = express();

const router = require("express").Router();

const { getRequest } = require('../utils');

//Get requisiton, of all products.
router.get('/', async (req, res) => {
  try {

    // arrays to receive the products 
    let productsData = []
    let productsList = []
    let productsObject = []
    let productsResult = []
    let produtoTratado = []

    // set variables to build the result of the request
    let pCode = ""
    let pId = ""
    let pDesc = ""
    let pProdPai = ""
    let pImg = "https://cdn-icons-png.flaticon.com/512/916/916762.png" // default img

    // while aux variables
    let j = 0
    let run = true
    let aut = true
    let times = 0
    let currentSecond = -1

    // variales to use in the requisition
    let pageNumber = 1
    let startReq = ""
    let endReq = ""
    let openSituation = false
    let productsRequisition = true

    //Concat all products requisions
    console.log('A requisição de produtos está sendo executada...')
    while (run) {

      // Verify if the current second is equal the auxiliar variable. Authorize if it is not equal.
      if (currentSecond != (new Date().getSeconds())) {
        currentSecond = (new Date().getSeconds())
        times = 0
        aut = true
      }

      // Authorize the requisition to run just 2 times for second
      if (aut) {
        try {
          productsData = await getRequest(pageNumber, startReq, endReq, openSituation, productsRequisition)
          if(productsData.produtos) productsList = productsList.concat(productsData.produtos);
          pageNumber++
          console.log(pageNumber)
        }
        catch (error) {
          console.error(` \n ALERTA DE ERRO: ${error}`)
        }

        //limit of requisition
        times++
        if (times > 2) { aut = false }

        //finalize the requisition.
        if (!productsData.produtos || productsData.produtos.length < 100) {
            run = false
            console.log('requisição completa! tamanho:', productsList.length)
        }
      }
    }

    console.log('len', productsList.length)
    //variables to deal with products fields
    while (j < productsList.length) {

      productsObject = productsList[j].produto

      pCode = productsList[j].produto.codigo
      pId = productsList[j].produto.id
      pDesc = productsList[j].produto.descricao
      if ('codigoPai' in productsObject) {
        pProdPai = productsList[j].produto.codigoPai;
      } else {
        pProdPai = productsList[j].produto.codigo
      }
      if ('imageThumbnail' in productsObject) pImg = productsList[j].produto.imageThumbnail

      //product fields
      produtoTratado = {
        pCode,
        pId,
        pDesc,
        pProdPai,
        pImg
      }

      productsResult = productsResult.concat(produtoTratado);
      j++;
    }

    res.json(productsResult)
  }
  catch (err) {
    console.log(err)
    res.json({ err })
  }
})


module.exports = router