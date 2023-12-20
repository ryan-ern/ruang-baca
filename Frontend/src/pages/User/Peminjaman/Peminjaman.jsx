import TablePeminjaman from "./Tablepinjam";
import Wavebot from "../../../components/background/Wavebot";
import Waveup from "../../../components/background/Wavetop";
import { Col, Row, Container } from "react-bootstrap";
import IMAGES from "../../../assets/images";

export default function Peminjaman() {
    return (
        <>
            <Waveup color="#B6D8CF" />
            <Wavebot color="#B6D8CF" />
            <div className="py-4">
                <Container>
                    <Row>
                        <Col sm={12} lg={1} className="text-center mb-2">
                            <img
                                src={IMAGES.logo}
                                alt="Logo SMKN 7 Bandar Lampung"
                                width={50}
                            />
                        </Col>
                        <Col sm={12} lg={10} >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <h3 className="text-center">
                                    RUANG BACA <br /> SMK NEGERI 7 BANDAR LAMPUNG
                                </h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                
                            </div>
                        </Col>
                    </Row>
                    <TablePeminjaman />
                </Container>
            </div>
        </>
    );
}