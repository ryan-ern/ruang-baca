/*const {
    default: makeWASocket,
    DisconnectReason,
    fetchLatestBaileysVersion,
    isJidBroadcast,
    makeInMemoryStore,
    useMultiFileAuthState,
} = require("@adiwajshing/baileys");*/
/*const log = (pino = require("pino"));
const { session } = { "session": "auth_info" };
const { Boom } = require("@hapi/boom");*/
const express = require('express')
const cors = require('cors')
const routes = require('./src/route/route')
const cookieParser = require ('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./src/swagger/swagger')
const path =  require('path')
const bodyParser = require('body-parser')
const moment = require('moment')
const http = require('http')
const socketIO = require('socket.io')

require("dotenv").config()

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const now = new Date().getTime()
const timeServer = {
    timestamp : now,
    moment: moment(now).format(),
    string: moment(now).format('yyyy-M-D HH:mm:ss'),
}

app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(cors())

app.use(express.static ('uploads'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (_, res) => {
  res.send({
      message: "Welcome",
      time: timeServer
  })
})


app.use(routes)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Running in port ${PORT}`)
})