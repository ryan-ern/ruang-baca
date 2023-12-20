import Wavebot from "../../../components/background/Wavebot";
import Waveup from "../../../components/background/Wavetop";
import "../../../assets/styles/common.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import IMAGES from "../../../assets/images";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { dashboard } from "../../../store/actions";
import { Link } from "react-router-dom";

export default function DashboardAdmin() {
    const dispatch = useDispatch()
    const dashboardState = useSelector((state) => state.book.response.count)
    // const whatsappState = useSelector((state) => state.book.whatsapp)
    // console.log(whatsappState)
    useEffect(() => {
    
        dispatch(dashboard());
        // dispatch(getWhatsapp());

        const intervalId = setInterval(() => {
            dispatch(dashboard());
        }, 10_000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <>
            <Waveup color="#B6D8CF" />
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
                            <Link to="/panel/borrow-validation" className="nav-link">
                                <Card className="cardadmin">
                                    <Card.Body className="pt-0">
                                        <table className="mb-0 pt-0">
                                            <tbody>
                                                <tr>
                                                    <th className="fs-1">{dashboardState ? dashboardState.countPinjam : '0'}</th>
                                                    <td rowSpan="2" ><img style={{ height: '70px', background: 'transparent', padding: '0px', marginTop: '20px' }} src={IMAGES.peminjaman1}></img></td>
                                                </tr>
                                                <tr>
                                                    <td >Permintaan Peminjaman Buku</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                    <Card.Footer style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} className="cardadmin-footer">
                                        Validasi
                                    </Card.Footer>
                                </Card>
                            </Link>
                        </Col>
                        <Col lg={3}>
                            <Link to="/panel/return-validation" className="nav-link">
                                <Card className="cardadmin">
                                    <Card.Body className="pt-0">
                                        <table className="mb-0 pt-0">
                                            <tbody>


                                                <tr>
                                                    <th className="fs-1">{dashboardState ? dashboardState.countDenda : '0'}</th>
                                                    <td rowSpan="2" ><img style={{ height: '80px', background: 'transparent', padding: '0px', marginTop: '10px' }} src={IMAGES.pengembalian1}></img></td>
                                                </tr>
                                                <tr>
                                                    <td >Pendapatan Total Denda</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                    <Card.Footer style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} className="cardadmin-footer">
                                        Validasi
                                    </Card.Footer>
                                </Card>
                            </Link>
                        </Col>
                        <Col lg={3}>
                            <Link to="/panel/inventory" className="nav-link">
                                <Card className="cardadmin">
                                    <Card.Body className="pt-0">
                                        <table className="mb-0 pt-0">
                                            <tbody>

                                                <tr>
                                                    <th className="fs-1">{dashboardState ? dashboardState.countBook : '0'}</th>
                                                    <td rowSpan="2"><img style={{ height: '70px', background: 'transparent', padding: '0px', marginLeft: '20px', marginTop: '20px' }} src={IMAGES.databuku1}></img></td>
                                                </tr>
                                                <tr>
                                                    <td >Total Data Buku Saat Ini</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                    <Card.Footer style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} className="cardadmin-footer">
                                        Lebih Lengkap
                                    </Card.Footer>
                                </Card>
                            </Link>
                        </Col>
                        <Col lg={3}>
                            <Link to="/panel/account-control" className="nav-link">

                                <Card className="cardadmin">
                                    <Card.Body className="pt-0">
                                        <table className="mb-0 pt-0">
                                            <tbody>

                                                <tr>
                                                    <th className="fs-1">{dashboardState ? dashboardState.countUser : '0'}</th>
                                                    <td rowSpan="2" ><img style={{ height: '70px', background: 'transparent', padding: '0px', marginTop: '20px' }} src={IMAGES.pengguna1}></img></td>
                                                </tr>
                                                <tr>
                                                    <td >Total Akun Pengguna Saat Ini</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Card.Body>
                                    <Card.Footer style={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }} className="cardadmin-footer">
                                        Info Lengkap
                                    </Card.Footer>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}