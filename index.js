const express = require('express')
const path = require('path')
const userRoute = require('./route/user')
const session = require('express-session')
const auth = require('./db/auth')
const methodOverride = require('method-override')

const Port = process.env.PORT || 3000

const app = express()
app.use(session({
  secret: process.env.name || auth.name,
  resave: false,
  saveUninitialized: false,
  name: "marcyGram"
}))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// app.get('/', (req,res) => {
//   res.send('g')
// // })

app.use('/', userRoute)

app.listen(Port, () => {
  console.log(`Listening on port ${Port}!`)
}) 
