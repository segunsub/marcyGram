const express = require('express')
const path = require('path')
const userRoute = require('./route/user')
const postRoute = require('./route/post')
const fs = require('fs')


const Port = process.env.PORT || 3000


const app = express()


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('view engine', 'ejs');

app.use('/', userRoute)

app.listen(Port, () => {
  console.log(`Listening on port ${Port}!`)
}) 
