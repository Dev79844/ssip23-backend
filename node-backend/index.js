const express = require('express')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const productRouter = require('./routes/product')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(morgan('tiny'))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))

app.use("/api/v1",productRouter)

mongoose.connect(process.env.URI)
    .then(() => {
        console.log("DB connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        })
    })