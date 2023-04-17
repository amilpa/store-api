require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const { default: mongoose } = require('mongoose')

const notFound = require('./middlewares/not-found')
const handleError = require('./middlewares/error-handler')

const products = require('./routes/products')

//middlewares
app.use(express.json())

//routes
app.get('/',(req,res) => {
  res.send('<h1>Store API</h1><a href="/api/vi/products">products routes</a>')
})

app.use('/api/v1/products',products)

app.use(notFound)
app.use(handleError)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port,() => console.log(`Server is listening at port:${port}`))
  } catch (error) {
    console.log(error)
  }
}

// process.on('SIGINT',() => {
//   mongoose.connection.close()
//     .then(() => {
//       console.log('Previous connection closed')
//       process.exit(0)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// })

start()