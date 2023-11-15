const express = require('express')
const cors = require('cors')
const routes = require('./src/route/route')
const cookieParser = require ('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./src/swagger/swagger')

require("dotenv").config()

const app = express()

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))
app.use(cookieParser())

app.use(cors({
  credential:true,
  origin:[
    "http://localhost:7000",
    "http://192.168.100.58:4000",
    "http://172.16.36.47:4000"
]
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (_, res) => {
  res.send({
      message: "Welcome",
  })
})


app.use(routes)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`)
})