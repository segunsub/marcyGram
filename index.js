const express = require('express')
const path = require('path')
const userRoute = require('./route/user')
const postRoute = require('./route/post')
const fs = require('fs')
const https = require('https')

const Port = process.env.PORT || 3000
const httpsPort = 4000

const key = fs.readFileSync('./cert/localhost.key');
const cert = fs.readFileSync('./cert/localhost.crt');

const app = express()
const server = https.createServer({key: key, cert: cert }, app);
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('view engine', 'ejs');

app.use('/', userRoute)

app.listen(Port, () => {
  console.log(`Listening on port ${Port}!`)
}) 
server.listen(httpsPort, function () {
  console.log(`Listening on port ${httpsPort}!`)
})