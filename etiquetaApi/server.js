const express = require('express');
const router = require("express").Router();
const app = express();
const appHis = express();
const cors = require('cors');
const HTTP_PORT = 8500;
const fs = require('fs');
const mongoose = require('mongoose');
const exec = require('child_process').exec;
const pathModel = "/Users/bi004042/Documents/CodeDocuments/projetos2/LabelCustomizer_StockProject/etiquetaApi/modelo/ModeloEtiquetaProduto.txt"
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const LabelCode = require('./src/models/LabelCode');
const LabelHis = require('./src/models/LabelHis');
require('dotenv').config();
app.use(express.json());
app.use(cors());
appHis.use(express.json());
appHis.use(cors());


//print using Zebra file
async function callZebraPrinter(res, campoCod, campoDesc1, campoDesc2){

  const pathSave = "/Users/bi004042/Documents/CodeDocuments/projetos2/LabelCustomizer_StockProject/etiquetaApi/modelo/"+campoCod+".zpl"

  //Read the zebra file and then, change some variables and finally save a new archieve
  fs.readFile(pathModel, 'utf8', function(err, data){
    data = data.replace('@endereco_ean', campoCod);
    data = data.replace('@produto_string1', campoDesc1);
    data = data.replace('@produto_string2', campoDesc2);
    data = data.replace('@endereco_ean-2', campoCod);
    data = data.replace('@produto_string1-2', campoDesc1);
    data = data.replace('@produto_string2-2', campoDesc2);
    data = data.replace('@endereco_ean-3', campoCod);
    data = data.replace('@produto_string1-3', campoDesc1);
    data = data.replace('@produto_string2-3', campoDesc2);
  
    //Open the terminal and run the zebra archieve to printer
    fs.writeFile(pathSave, data, (err) => {
      if (err)
        console.log(err);
      else {
        exec("lpr -l "+pathSave, (err, stdout, stderr) => {
          return res.json({msg: "post executed, data below:", campoCod, campoDesc1, campoDesc2})
        });
      }
    });
  });
};

//Get requisiton, it can be get this table: just the prymary key label.
app.get('/procces', async (req, res) => {
  try{
    const dataLabelCode = await LabelCode.find()
    res.status(200).json(dataLabelCode)

  }catch (error) {
    res.status(500).json({ error: error })
  }
})

//Get requisiton, it can be get this table: historyLabel.
appHis.get('/historic', async (req, res) => {
  try{
    const dataLabelHis = await LabelHis.find()
    res.status(200).json(dataLabelCode)

  }catch (error) {
    res.status(500).json({ error: error })
  }
})

//Post requisition, it change the printer variables from the post requisition from Front End
app.post('/procces', function (req, res) {

  let campoCod = req.body.campoCod
  let campoDesc1 = req.body.campoDesc1
  let campoDesc2 = req.body.campoDesc2

  // Test if there are a field code
  if(!campoCod) {
    res.status(422).json({error: 'o codigo do produto e obrigatorio!'})
    return 
  }

  const labelExecCode = {
    campoCod,
    campoDesc1,
    campoDesc2
  }

  try {
    LabelCode.create(labelExecCode)
    // Call function that will print labels
    callZebraPrinter(res, campoCod, campoDesc1, campoDesc2);  
    //To open the unprinter mode, coment the top line and discoment de bottom line
    // return res.json({msg: "post executed, data below:", campoCod, campoDesc1, campoDesc2})

  }catch(error) {
    res.status(500).json({error: error})
  }
})

//Post requisition, it change the printer variables from the post requisition from Front End
appHis.post('/historic', function (req, res) {

  let usuario = req.body.usuario
  let data = req.body.data
  let horario = req.body.horario
  let quantidade = req.body.quantidade
  let campoCod = req.body.campoCod
  let campoDesc1 = req.body.campoDesc1
  let campoDesc2 = req.body.campoDesc2

  // Test if there are a field code
  if(!campoCod) {
    res.status(422).json({error: 'o codigo do produto e obrigatorio!'})
    return 
  }

  const labelHistory = {
    usuario,
    data,
    horario,
    quantidade,
    campoCod,
    campoDesc1,
    campoDesc2
  }

  try {
    LabelHis.create(labelHistory)

  }catch(error) {
    res.status(500).json({error: error})
  }
})

// Read - filter by code
app.get('/procces/:campoCod', async (req, res) => {

  // extract the requisition data by the url = req.params
  const campoCod = req.params.campoCod

  try{
    const currentLabelHis = await LabelHis.findOne({campoCod: campoCod})
    const currentLabelCode = await LabelCode.findOne({campoCod: campoCod})

    if(!campoCod) {
      res.status(422).json({message: 'O produto nao foi encontrado'})
      return
    }

    res.status(200).json(currentLabelCode)

  } catch (error) {
    res.status(500).json({ error: error })
  }

})

//Modify label
app.put('/procces/:campoCod' , async (req, res) => {

  let {campoCod, campoDesc1, campoDesc2} = req.body

  const labelExecCode = {
    campoCod,
    campoDesc1,
    campoDesc2
  }

  try{

    const updatedExecLabel = await LabelCode.updateOne({campoCod:campoCod}, labelExecCode)

    if(updatedExecLabel.matchedCount === 0) {
      res.status(422).json({message: 'O produto nao foi atualizado'})
      return
    }

    res.status(200).json(labelExecCode)

  }catch(error){
    res.status(500).json({error:error})
  }
})


//test if the server is running
app.listen(HTTP_PORT, () => {
  console.log("Server is running!")
});

//conect to mongoDB
mongoose.connect(
  `mongodb://tiagopazhs:Aani0607@ac-xb501ws-shard-00-00.ibx1tea.mongodb.net:27017,ac-xb501ws-shard-00-01.ibx1tea.mongodb.net:27017,ac-xb501ws-shard-00-02.ibx1tea.mongodb.net:27017/?ssl=true&replicaSet=atlas-jxxop3-shard-0&authSource=admin&retryWrites=true&w=majority`
)
.then(() => {
  console.log('MongoDb are connected!')
})
.catch((err) => console.log(err));

module.exports = router