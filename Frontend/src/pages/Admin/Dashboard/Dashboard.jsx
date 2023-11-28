import Wavebot from "../../../components/background/Wavebot";
import Waveup from "../../../components/background/Wavetop";
import "../../../assets/styles/common.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import IMAGES from "../../../assets/images";

export default function DashboardAdmin() {
    return(
        <>
            <Waveup color="#B6D8CF"/>
            <Wavebot color="#B6D8CF" />
            <div className="py-4">
                <Container>
                    <Row className="mb-5">
                        <Col xs={1}>
                            <img
                                src={IMAGES.logo}
                                alt="Logo SMKN 7 Bandar Lampung"
                                width={50}
                            />
                        </Col>
                        <Col>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <h5 className="text-center">
                  RUANG BACA <br /> SMK NEGERI 7 BANDAR LAMPUNG
                                </h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3}>
                            <Card className="cardadmin">
                                <Card.Body className="pt-0">
                                    <table  className="mb-0 pt-0">
                                        <tbody>
                                            <tr>
                                                <th className="fs-1">13</th>
                                                <td rowSpan="2" ><img style={{height:'70px',  background: 'transparent', padding:'0px', marginTop:'20px'}} src={IMAGES.peminjaman1}></img></td>
                                            </tr>
                                            <tr>
                                                <td >Permintaan Peminjaman Buku</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Card.Body>
                                <Card.Footer style={{ borderBottomLeftRadius:'12px', borderBottomRightRadius:'12px'}} className="cardadmin-footer">
                                validasi
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={3}>
                            <Card className="cardadmin">
                                <Card.Body className="pt-0">
                                    <table  className="mb-0 pt-0">
                                        <tbody>

                                        
                                            <tr>
                                                <th className="fs-1">15</th>
                                                <td rowSpan="2" ><img style={{height:'80px',  background: 'transparent', padding:'0px',marginTop:'10px'}} src={IMAGES.pengembalian1}></img></td>
                                            </tr>
                                            <tr>
                                                <td >Permintaan Pengembalian Buku</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Card.Body>
                                <Card.Footer style={{ borderBottomLeftRadius:'12px', borderBottomRightRadius:'12px'}} className="cardadmin-footer">
                                validasi
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={3}><Card className="cardadmin">
                            <Card.Body className="pt-0">
                                <table  className="mb-0 pt-0">
                                    <tbody>

                                        <tr>
                                            <th className="fs-1">401</th>
                                            <td rowSpan="2"><img style={{height:'70px',  background: 'transparent', padding:'0px', marginLeft:'20px', marginTop:'20px'}} src={IMAGES.databuku1}></img></td>
                                        </tr>
                                        <tr>
                                            <td >Total Data Buku Saat Ini</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card.Body>
                            <Card.Footer style={{ borderBottomLeftRadius:'12px', borderBottomRightRadius:'12px'}} className="cardadmin-footer">
                                more info
                            </Card.Footer>
                        </Card>
                        </Col>
                        <Col lg={3}><Card className="cardadmin">
                            <Card.Body className="pt-0">
                                <table  className="mb-0 pt-0">
                                    <tbody>

                                        <tr>
                                            <th className="fs-1">4002</th>
                                            <td rowSpan="2" ><img style={{height:'70px',  background: 'transparent', padding:'0px', marginTop:'20px'}} src={IMAGES.pengguna1}></img></td>
                                        </tr>
                                        <tr>
                                            <td >Total Akun Pengguna Saat Ini</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card.Body>
                            <Card.Footer style={{ borderBottomLeftRadius:'12px', borderBottomRightRadius:'12px'}} className="cardadmin-footer">
                                more info
                            </Card.Footer>
                        </Card>
                        </Col>
                        
                    </Row>
                </Container>
            </div>
        </>
    );
}