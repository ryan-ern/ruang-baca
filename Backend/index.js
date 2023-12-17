const {
  default: makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  makeInMemoryStore,
  useMultiFileAuthState,
} = require("@adiwajshing/baileys");

const whatsappService = require('./src/service/whatsappService')

const log = (pino = require("pino"));
const { session } = { "session": "auth_info" };
const { Boom } = require("@hapi/boom");
const express = require('express')
const cors = require('cors')
const qrcode = require('qrcode')
const routes = require('./src/route/route')
const cookieParser = require ('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./src/swagger/swagger')
const path =  require('path')
const bodyParser = require('body-parser')
const moment = require('moment')
const socketIO = require('socket.io')

require("dotenv").config()

const app = require("express")()
const server = require("http").createServer(app)
const io = socketIO(server, { path: '/socket.io' });
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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use(express.static ('uploads'))
app.use("/assets", express.static(__dirname + "/assets"));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (_, res) => {
res.send({
    message: "Welcome",
    time: timeServer
})
})

app.get('/whatsapp',async (req, res) =>{ 
  /*if(a){
      try{
          const data = await whatsappService.getData();
          try {
              if (!data || !data.length) {
                  res.status(500).json({
                      status: false,
                      response: 'Data not provided!',
                  });
              } else {
                  const messages = [];
  
                  for (const item of data) {
                      const number = item.wa;
                      const name = item.name;
                      const pesankirim = `hello ${name} lagi nyoba.`;
  
                      if (!number || !pesankirim) {
                          messages.push(`Invalid data for number: ${number}`);
                          continue;
                      }
  
                      const numberWA = '62' + number.substring(1) + "@s.whatsapp.net";
  
                      if (isConnected()) {
                          const exists = sock.onWhatsApp(numberWA);
  
                          if (exists?.jid || (exists && exists[0]?.jid)) {
                              const result = sock.sendMessage(exists.jid || exists[0].jid, { text: pesankirim });
                              messages.push(result);
                          } else {
                              messages.push(`Nomor ${number} tidak terdaftar.`);
                          }
                      } else {
                          messages.push('WhatsApp belum terhubung.');
                      }
                  }
  
                  res.status(200).json({
                      status: true,
                      response: messages,
                  })
              }
          } catch (err) {
              console.error('Error in whatsappSend:', err);
              return res.status(500).json({
                  status: false,
                  response: 'An error occurred in whatsappSend',
              });
          }
      }catch(err){
          console.error('Error in whatsappSend:', err);
          if (res) {
              res.status(200).json({
                  status: true,
                  response: 'QR Code scanned successfully.',
              });
          } else {
              console.error('Response object is undefined.');
          }
      }
  }*/
  res.sendFile("./assets/index.html", {
      root: __dirname,
  });
})

app.use(routes)
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

let sock;
let qr;
let soket;

function deleteAuthInfoFolder() {
const authInfoPath = path.join(session);
if (fs.existsSync(authInfoPath)) {
    fs.rmSync(authInfoPath, { recursive: true });
    console.log(`Folder ${session} deleted.`);
}
}

async function connectToWhatsApp() {
const { state, saveCreds } = await useMultiFileAuthState('auth_info')
let { version, isLatest } = await fetchLatestBaileysVersion();
sock = makeWASocket({
    printQRInTerminal: false,
    auth: state,
    logger: log({ level: "silent" }),
    version: [2, 2323, 4],
    shouldIgnoreJid: jid => isJidBroadcast(jid)
});
store.bind(sock.ev);
sock.multi = true
sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (update.qr) {
        qr = update.qr;
        updateQR("qr");
    }
    else if (qr = undefined) {
        updateQR("loading");
    }
    else {
        if (update.connection === "open") {
            updateQR("qrscanned");
            return;
        }
    }
    if (connection === 'close') {
        let reason = new Boom(lastDisconnect.error).output.statusCode;
        if (reason === DisconnectReason.badSession) {
            console.log(`Bad Session File, Please Scan Again`);
            deleteAuthInfoFolder()
            connectToWhatsApp();
        } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            connectToWhatsApp();
        } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            connectToWhatsApp();
        } else if (reason === DisconnectReason.connectionReplaced) {
            console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
            deleteAuthInfoFolder()
            connectToWhatsApp();
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(`Device Logged Out, Please Scan Again.`);
            deleteAuthInfoFolder()
            connectToWhatsApp();
        } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            connectToWhatsApp();
        } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            connectToWhatsApp();
        } else {
            console.log(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`);
            deleteAuthInfoFolder()
            connectToWhatsApp();
        }
    } else if (connection === 'open') {
        console.log('opened connection');
        let getGroups = await sock.groupFetchAllParticipating();
        let groups = Object.entries(getGroups).slice(0).map(entry => entry[1]);
        console.log(groups);
        return;
    }

});
sock.ev.on("creds.update", saveCreds);
}

io.on("connection", async (socket) => {
soket = socket;
//console.log(soket)
if (isConnected) {
    updateQR("connected");
} else if (qr) {
    updateQR("qr");
}
});

const isConnected = () => {
return (sock.user);
};

const updateQR = async (data, res) => {
switch (data) {
    case "qr":
        qrcode.toDataURL(qr, (err, url) => {
            soket?.emit("qr", url);
            soket?.emit("log", "QR Code received, please scan!");
        });
        break;
    case "connected":
        soket?.emit("qrstatus", "./assets/check.svg");
        soket?.emit("log", "WhatsApp terhubung!");
          const data = await whatsappService.getData();
          if (!data || !data.length) {
                  break
          } else {
              const messages = [];
  
              for (const item of data) {
                  const number = item.wa;
                  const name = item.name;
                  const pesankirim = `hello ${name} lagi nyoba.`;
  
                  if (!number || !pesankirim) {
                      messages.push(`Invalid data for number: ${number}`);
                      continue;
                  }

                  const numberWA = '62' + number.substring(1) + "@s.whatsapp.net";
  
                  if (isConnected()) {
                      const exists = sock.onWhatsApp(numberWA);

                      if (exists?.jid || (exists && exists[0]?.jid)) {
                          const result = sock.sendMessage(exists.jid || exists[0].jid, { text: pesankirim });
                          messages.push(result);
                      } else {
                          messages.push(`Nomor ${number} tidak terdaftar.`);
                      }
                  } else {
                      messages.push('WhatsApp belum terhubung.');
                  }
              }
          }
        break;
    case "qrscanned":
        soket?.emit("qrstatus", "./assets/check.svg");
        soket?.emit("log", "QR Code Telah discan!");
        break;
    case "loading":
        soket?.emit("qrstatus", "./assets/loader.gif");
        soket?.emit("log", "Registering QR Code , please wait!");
        break;
    default:
        break;
}
};
connectToWhatsApp()
.catch(err => console.log("unexpected error: " + err))

const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
console.log(`Running in port ${PORT}`)
})