const express = require('express');
const app = express();
const cors = require('cors');
const HTTP_PORT = 8500;
const fs = require('fs');
const exec = require('child_process').exec;
const pathModel = "/Users/bi004042/Documents/CodeDocuments/projetos2/LabelCustomizer_StockProject/etiquetaApi/modelo/ModeloEtiquetaProduto.txt"

app.use(express.json());
app.use(cors());

//Get requisiton, in this moment it is working just to test the aplication.
app.get('/', function (req, res, next) {
  res.json({msg: 'The requisition is working!'})
})

//Post equisition, it change the printer variables from the post requisition from Front End
app.post('/procces', function (req, res) {
    let campoCod = req.body.campoCod
    let campoDesc1 = req.body.campoDesc1
    let campoDesc2 = req.body.campoDesc2
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
        }});
    });    
  })

app.listen(HTTP_PORT, () => {
    console.log("Serviço iniciado... ")
});