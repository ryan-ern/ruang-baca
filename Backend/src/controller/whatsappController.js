const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const { default: makeWASocket,
    DisconnectReason,
    fetchLatestBaileysVersion,
    isJidBroadcast,
    makeInMemoryStore,
    useMultiFileAuthState, } = require("@adiwajshing/baileys")
const qrcode = require("qrcode")
const log = (pino = require("pino"))
const { session } = { "session": "auth_info" }
const { Boom } = require("@hapi/boom")
const fs = require('fs')
const path = require('path')

const whatsappService = require('../service/whatsappService');
const kode = require('../helper/whatsappSend')

const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) })

let sock;
let qr;
let soket;
class WhatsAppController{

    static async deleteAuthInfoFolder() {
        const authInfoPath = path.join(session)
        if (fs.existsSync(authInfoPath)) {
            fs.rmSync(authInfoPath, { recursive: true });
            console.log(`Folder ${session} deleted.`);
        }
    }
    static isConnected = () => {
        return (sock.user);
    };

    static async updateQR(data, res){
        switch (data) {
            case "qr":
                qrcode.toDataURL(qr, (err, url) => {
                    soket?.emit("qr", url);
                    soket?.emit("log", "QR Code received, please scan!");

                    res?.send(url);
                });
                break;
            case "connected":
                soket?.emit("qrstatus", "../../assets/check.svg");
                soket?.emit("log", "WhatsApp terhubung!");
                break;
            case "qrscanned":
                soket?.emit("qrstatus", "../../assets/check.svg");
                soket?.emit("log", "QR Code Telah discan!");
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
            
                                if (await this.isConnected()) {
                                    const exists = await sock.onWhatsApp(numberWA);
            
                                    if (exists?.jid || (exists && exists[0]?.jid)) {
                                        const result = await sock.sendMessage(exists.jid || exists[0].jid, { text: pesankirim });
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
                break;
            case "loading":
                soket?.emit("qrstatus", "../../assets/loader.gif");
                soket?.emit("log", "Registering QR Code , please wait!");
                break;
            default:
                break;
        }
    };

    static async connectToWhatsApp() {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info')
        let { version, isLatest } = await fetchLatestBaileysVersion()
        sock = makeWASocket({
            printQRInTerminal: true,
            auth: state,
            logger: log({ level: "silent" }),
            version: [2, 2323, 4],
            shouldIgnoreJid: jid => isJidBroadcast(jid)
        })
        store.bind(sock.ev)
        sock.multi = true
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update
            if (update.qr) {
                qr = update.qr;
                await this.updateQR("qr")
            }
            else if (qr = undefined) {
                await this.updateQR("loading");
            }
            else {
                if (update.connection === "open") {
                    await this.updateQR("qrscanned")
                    return
                }
            }
            if (connection === 'close') {
                let reason = new Boom(lastDisconnect.error).output.statusCode;
                if (reason === DisconnectReason.badSession) {
                    console.log(`Bad Session File, Please Scan Again`);
                    await this.deleteAuthInfoFolder()
                    await this.connectToWhatsApp()
                } else if (reason === DisconnectReason.connectionClosed) {
                    console.log("Connection closed, reconnecting....")
                    await this.connectToWhatsApp()
                } else if (reason === DisconnectReason.connectionLost) {
                    console.log("Connection Lost from Server, reconnecting...")
                    await this.connectToWhatsApp()
                } else if (reason === DisconnectReason.connectionReplaced) {
                    console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First")
                    await this.deleteAuthInfoFolder()
                    await this.connectToWhatsApp()
                } else if (reason === DisconnectReason.loggedOut) {
                    console.log(`Device Logged Out, Please Scan Again.`)
                    await this.deleteAuthInfoFolder()
                    await this.connectToWhatsApp()
                } else if (reason === DisconnectReason.restartRequired) {
                    console.log("Restart Required, Restarting...")
                    await this.connectToWhatsApp()
                } else if (reason === DisconnectReason.timedOut) {
                    console.log("Connection TimedOut, Reconnecting...")
                    await this.connectToWhatsApp()
                } else {
                    console.log(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`)
                    await this.deleteAuthInfoFolder()
                    await this.connectToWhatsApp()
                }
            } else if (connection === 'open') {
                console.log('opened connection')
                let getGroups = await sock.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                console.log(groups)
                return
            }
    
        });
        sock.ev.on("creds.update", saveCreds)
        io.on("connection", async (socket) => {
            soket = socket;
            // console.log(sock)
            if (await this.isConnected) {
                await this.updateQR("connected");
            } else if (qr) {
                await this.updateQR("qr");
            }
        });  
    } 
}

module.exports = WhatsAppController