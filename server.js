const express= require('express')
const app= express()
const dotenv= require('dotenv')
const morgan= require('morgan')
const bodyparser= require('body-parser')
const path= require('path')

const connectDB= require('./server/database/connection')

dotenv.config({path:'config.env'})  //check to make sure the brackets r correct

//log requests ; morgan logs the requests
app.use(morgan('tiny'))

//mongodb connection
connectDB()

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}))


//set view engine ; if using html or pug can specifiy it here instead of ejs
app.set('view engine', 'ejs')
//app.set('views', path.resolve(__dirname, 'views/ejs'))


//load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
// css/style.css
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))


//load routers
app.use('/', require('./server/routes/router'))

const PORT= process.env.PORT || 8080



app.listen(3000, () => {console.log(`Server is running on http://localhost:${PORT}`)})