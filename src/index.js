const path = require('path')
const express = require('express')
const engine = require('express-edge')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(engine)
app.set('views', `${__dirname}/views`)

//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const {dbConnection} = require('./database/config')
const finales = require('./models/finales')

dbConnection();
//routes
app.get('/', (req, res) => {
  res.render('principal', { year: null, winner: null }); // Renderizamos la vista principal sin datos por defecto
});



app.post('/', async (req, res) => {
  const year = req.body.year
  const winner =req.body.winner
  const countryA = req.body.countryA
  
  let final =[]
  if(year && winner && countryA){
    final = await finales.find({Year:year, Winner: winner,CountryA:countryA})
  }
  else if (year && winner){
    final = await finales.find({Year:year, Winner:winner})
  }
  else if (winner && countryA){
    final = await finales.find({Winner:winner,CountryA:countryA})
  }
  else if (year && countryA){
    final = await finales.find({Year:year, CountryA: countryA})
  }

  else 
  if (year){
    final = await finales.find({Year:year})
  } else if(winner){
    final = await finales.find({Winner: winner})
  }
  else if(countryA){
    final= await finales.find({CountryA: countryA})
  }

  res.render('principal', { year: final, winner:final }); // Renderizamos la vista principal con los datos encontrados
});



app.get('/catalogo',async (req, res) => {

    const final = await finales.find({})

    console.log(final)
    res.render('catalogo',{
        final
    })
})

app.listen(4000, () => {
    console.log('listened on port 4000')
})