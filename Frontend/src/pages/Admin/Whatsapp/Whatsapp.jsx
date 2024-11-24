import { useEffect } from "react";
import Waveup from "../../../components/background/Wavetop";
import Wavebot from "../../../components/background/Wavebot";
import IMAGES from "../../../assets/images";
import { io } from 'socket.io-client';
import { Card, Col, Container, Row } from "react-bootstrap";

export default function WhatsappSettings() {
    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCK_URL);
        const qrcode = document.getElementById("qrcode");

        // Listen to the "qr" event to update the QR code image
        socket.on("qr", (src) => {
            qrcode.setAttribute("src", src);
            qrcode.setAttribute("alt", "qrcode");
        });

        // Listen to the "qrstatus" event to show the loading image or status
        // socket.on("qrstatus", (log) => {
        //     qrcode.setAttribute("src", IMAGES.loader);
        //     qrcode.setAttribute("alt", IMAGES.loader);
        // });

        // Listen to the "log" event to handle WhatsApp connection status
        socket.on("log", (log) => {
            if (log === 'WhatsApp connected!' || log === 'QR Code scanned!') {
                qrcode.setAttribute("src", IMAGES.check);  // Assuming 'check' is a success image in IMAGES
                qrcode.setAttribute("alt", log);
            }
        });

        // Cleanup socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, [])
    return (
        <Container>
            <Waveup color="#B6D8CF" />
            <Wavebot color="#B6D8CF" />
            <Row className="py-4 d-flex justify-content-center">
                <Col lg={6} sm={12}>
                    <Card className="overflow-hidden border-0 shadow-lg rounded-4 text-center">
                        <Card.Body>
                            <div className="text-center mb-2">
                                <h4>Silahkan Scan QR Whatsapp</h4>
                                <h6 className="text-danger">Jika QR tidak keluar selama 20 detik silahkan refresh website. Jika status perangkat sudah sukses, silahkan refresh website untuk mengirim pesan.</h6>
                            </div>
                            <div id="qrcode-container">
                                <img src={IMAGES.loader} alt="loading" id="qrcode" width='65%' />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}