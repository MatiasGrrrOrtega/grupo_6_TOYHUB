const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const methodOverride = require('method-override')

app.use(express.static('public')) // Indicamos el motor de plantilla
app.set('view engine', 'ejs') // Direccionamos a las vistas
app.set('views', path.join(__dirname, '/views'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method')) // for put and delete methods

const home = require('./routes/home')
const user = require('./routes/user')
const products = require('./routes/products')

app.use('/', home)
app.use('/user', user)
app.use('/products', products)

// app.use((req, res) => {
//   res.status(404).send('404 Not Found')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
