
// config inicial
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

//middleware para corrigir cors
app.use(cors())

// forma de ler JSON / middlewares
app.use(express.urlencoded({
  extended: true,
}),
)

app.use(express.json())

// rotas da animationPlayState: 
const labelRoutes = require('./routes/labelRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint

app.get('/', (req, res) => {

  //mostrar req

  res.json({message: 'Avançar!'})

})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@labelapicluster.ibx1tea.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Yeahhh we ara connected in MongoDb!!!')
    app.listen(3000)
  })

  .catch((err) => console.log(err))

