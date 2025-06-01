const {
    default: makeWASocket,
    DisconnectReason,
    fetchLatestBaileysVersion,
    isJidBroadcast,
    makeInMemoryStore,
    useMultiFileAuthState,
    delay,
} = require("@whiskeysockets/baileys");
const qrcode = require('qrcode');
const { Boom } = require("@hapi/boom");
const log = (pino = require("pino"));
const app = require("express")();
const server = require("http").createServer(app);
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const whatsappService = require('./src/service/whatsappService');
const dendaService = require('./src/service/returnService');
const express = require('express');
const cors = require('cors');
const routes = require('./src/route/route');
const cookieParser = require('cookie-parser');
const moment = require('moment');
const Holidays = require('date-holidays');
require("dotenv").config();

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

let sock, qr, soket, auth_info = 'auth_info';

const timeServer = {
    timestamp: Date.now(),
    moment: moment().format(),
    string: moment().format('YYYY-M-D HH:mm:ss'),
};

const hd = new Holidays("ID");

// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('uploads'));
app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(routes);

// Routes
app.get("/", (_, res) => {
    res.send({ message: "Welcome", time: timeServer });
});

app.get('/whatsapp', (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "assets") });
});

async function deleteAuthInfoFolder() {
    const authInfoPath = path.join(auth_info);
    if (fs.existsSync(authInfoPath)) {
        // Menghapus semua file di dalam direktori terlebih dahulu
        fs.readdirSync(authInfoPath).forEach((file) => {
            const filePath = path.join(authInfoPath, file);
            fs.rmSync(filePath, { recursive: true, force: true });
        });
        // Menghapus direktori setelah kosong
        fs.rmdirSync(authInfoPath);
        console.log(`Folder ${auth_info} deleted.`);
    }
}



async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    let { version, isLatest } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
        printQRInTerminal: false,
        auth: state,
        logger: log({ level: "silent" }),
        version: version,
        shouldIgnoreJid: jid => isJidBroadcast(jid)
    });

    store.bind(sock.ev);
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (update.qr) {
            qr = update.qr;
            updateQR("qr");
        } else if (qr === undefined) {
            updateQR("loading");
        } else if (connection === 'open') {
            updateQR("qrscanned");
        }
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect.error).output.statusCode;
            if (reason === DisconnectReason.badSession) {
                console.log(`Bad Session File, Please Scan Again`);
                deleteAuthInfoFolder();
                connectToWhatsApp();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log("Connection closed, reconnecting....");
                deleteAuthInfoFolder();
                connectToWhatsApp();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log("Connection Lost from Server, reconnecting...");
                connectToWhatsApp();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                deleteAuthInfoFolder();
                connectToWhatsApp();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device Logged Out, Please Scan Again.`);
                deleteAuthInfoFolder();
                connectToWhatsApp();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log("Restart Required, Restarting...");
                connectToWhatsApp();
            } else if (reason === DisconnectReason.timedOut) {
                console.log("Connection TimedOut, Reconnecting...");
                connectToWhatsApp();
            } else {
                console.log(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`);
                deleteAuthInfoFolder();
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('opened connection');
            return;
        }
    });

    sock.ev.on("creds.update", saveCreds);
}

io.on("connection", async (socket) => {
    soket = socket;
    if (isConnected()) {
        updateQR("connected");
    } else if (qr) {
        updateQR("qr");
    }
});


const isConnected = () => {
    return sock && sock.user;
};

const updateQR = async (data) => {
    switch (data) {
        case "qr":
            // Emit the QR code
            qrcode.toDataURL(qr, (err, url) => {
                soket?.emit("qr", url);
                soket?.emit("log", "QR Code received, please scan!");
            });
            break;

        case "connected":
            soket?.emit("qrstatus", "./assets/check.svg");
            soket?.emit("log", "WhatsApp connected!");

            const data = await whatsappService.getData();
            const denda = await dendaService.getDenda();

            handleMessages(data, denda);
            break;


        case "qrscanned":
            // Emit scanned QR status
            soket?.emit("qrstatus", "./assets/check.svg");
            soket?.emit("log", "QR Code scanned!");
            break;

        case "loading":
            // Emit loading status
            soket?.emit("qrstatus", "./assets/loader.gif");
            soket?.emit("log", "Registering QR Code. Please wait...");
            break;

        default:
            break;
    }
};

async function isNonWorkingDay(date) {
    const dayOfWeek = moment(date).isoWeekday();
    const isSunday = dayOfWeek === 7;
    const isHoliday = hd.isHoliday(moment(date).format("YYYY-MM-DD"));
    return isSunday || isHoliday;
};

async function calculateLateDays(dueDate, returnDate) {
    let lateDays = 0;
    let currentDate = moment(dueDate).add(1, 'days');

    while (currentDate.isBefore(returnDate, 'day')) {
        if (!(await isNonWorkingDay(currentDate))) {
            lateDays++;
        }
        currentDate.add(1, 'days');
    }

    return lateDays;
};

function formatRupiah(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

async function handleMessages(data, denda) {
    if (!data || !data.length) return;

    for (const item of data) {
        const { judul, wa: number, name, updated_at, due_date } = item;
        const terlambat = await calculateLateDays(due_date, moment());

        const pesan =
            terlambat <= 0
                ? `Halo ${name}, buku \"${judul}\" yang kamu pinjam pada ${moment(updated_at).format('DD-MM-YYYY')} harus dikembalikan pada ${moment(due_date).format('DD-MM-YYYY')}.`
                : `Maaf ${name}, buku \"${judul}\" melewati batas waktu. Denda saat ini: Rp${formatRupiah(terlambat * denda.nominal)}.`;

        if (!number || !pesan) continue;

        const numberWA = `62${number.slice(1)}@s.whatsapp.net`;
        if (isConnected()) {
            const exists = await sock.onWhatsApp(numberWA);
            if (exists?.jid || exists?.[0]?.jid) {
                await sock.sendMessage(exists.jid || exists[0].jid, { text: pesan });
                console.log('Message sent successfully.');
            } else {
                console.log(`Number ${number} is not registered.`);
            }
        } else {
            console.log("WhatsApp is not connected.");
        }
    }
}

connectToWhatsApp()
    .catch(err => console.log("unexpected error: " + err));
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
