import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row, Alert } from "react-bootstrap";
import Waveup from "../../components/background/Wavetop";
import { forgot } from "../../store/actions";

export default function Forgot() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const messageError = useSelector((state) => state.auth?.message?.data);

    const [forgotData, setForgotData] = useState({
        wa: "",
    });

    useEffect(() => {
        if (auth.isLogin) navigate('/panel');
    }, [auth.isLogin, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgot(forgotData, navigate));
    };

    return (
        <>
            <Waveup color="#e0f8f2" bg="#ffffff" />
            <div className="my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4">
                                <Card.Body className="p-sm-2">
                                    <div className="text-center mb-4">
                                        <h5 className="fs-3xl">
                                            <strong>Lupa Password</strong>
                                        </h5>
                                        <p className="text-muted">
                                            Masukkan nomor HP terdaftar
                                        </p>
                                    </div>

                                    {messageError ? (
                                        <Alert variant="danger">{messageError.message}</Alert>
                                    ) : (auth.message && !auth.isLogin) ? (
                                        <Alert variant="success">{auth.message}</Alert>
                                    ) : null}

                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-4">
                                            <Form.Label>
                                                Nomor HP<span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="form-control bg-light border-light"
                                                placeholder="Masukkan nomor HP"
                                                value={forgotData.wa}
                                                onChange={(e) => setForgotData({ ...forgotData, wa: e.target.value })}
                                                required
                                            />
                                        </Form.Group>

                                        <div className="pb-4">
                                            <Button
                                                className="btn custom-button w-100 rounded-pill"
                                                type="submit"
                                                variant="success"
                                            >
                                                Kirim Permintaan Ubah Password
                                            </Button>
                                        </div>

                                        <div className="text-center">
                                            <p>
                                                Sudah punya akun?
                                            </p>
                                            <button onClick={() => navigate("/login")} className="nav-link d-inline">Sign In</button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
