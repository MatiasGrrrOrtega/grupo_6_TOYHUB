const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static('public'))
// Indicamos el motor de plantilla
app.set('view engine', 'ejs')
//Direccionamos a las vistas
app.set('views', path.join(__dirname, '/views'))

const home = require('./routes/home')
const user = require('./routes/user')
app.use('/', home)
app.use('/user', user)


app.get('/login', (req, res) => {
  res.render('login');  
}); 

app.get('/register', (req, res) => {
  res.render('register');  
});  

app.get('/productCart', (req, res) => {
  res.render('productCart');  
});  

app.get('/productDetail', (req, res) => {
  res.render('productDetail');  
});  
// app.get('/productDetail', (req, res) => {
//   const filePath = path.join(__dirname, '/views/productDetail.html')
//   res.sendFile(filePath)
// })

// app.get('/productCart', (req, res) => {
//   const filePath = path.join(__dirname, '/views/productCart.html')
//   res.sendFile(filePath)
// })

// app.get('/register', (req, res) => {
//   const filePath = path.join(__dirname, '/views/register.html')
//   res.sendFile(filePath)
// })

//app.get('/login', (req, res) => {
//const filePath = path.join(__dirname, '/views/login.html')
//res.sendFile(filePath)
//})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
