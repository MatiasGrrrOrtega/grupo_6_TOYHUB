const express = require('express')
const app = express()
const port = 3000
const path = require('node:path')

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '/views/home.html')
  res.sendFile(filePath)
})

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

// app.get('/login', (req, res) => {
//   const filePath = path.join(__dirname, '/views/login.html')
//   res.sendFile(filePath)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
