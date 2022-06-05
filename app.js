const express = require('express')
const app = express()
const pagerouter = require('./router/pages')
const mongoose = require('mongoose')
app.use(express.urlencoded({extended:false}))


const session = require('express-session')
const mongodbsession = require('connect-mongodb-session')(session)



dburl='mongodb://127.0.0.1:27017/nodelogin'
mongoose.connect(dburl,()=>{
    console.log('connected to database login')
})

const store = new mongodbsession({
    uri: dburl,
    collection: 'mySessions'
})

app.use(session({
    secret: 'kanha',
    resave: false,
    saveUninitialized: false,
    store: store
}))


app.set('view engine','ejs')
app.use(express.static('public'))
app.use(pagerouter)




app.listen(4000,(req,res)=>{
    console.log('server is running on port 4000')
})




//npm install express-session
//npm install connect-mongodb-session