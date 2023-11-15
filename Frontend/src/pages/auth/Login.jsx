import { Button, Card, Col, Form, Row, Container  } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Waveup from "../../components/background/Wavetop";

export default function Login() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/panel")
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <Waveup color="#e0f8f2" bg="#ffffff"/>
            <div className="my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4">
                                <Card.Body className="p-sm-2">
                                    <div className="text-center">
                                        <h5 className="fs-3xl">
                                            <strong>Selamat Datang di RUANG BACA</strong>
                                            <br />
                                            <strong>SMK NEGERI 7 BANDAR LAMPUNG</strong>
                                        </h5>
                                        <p className="text-muted">
                                            Silahkan Sign In
                                        </p>
                                    </div>
                                    <div>
                                        <Form action="#" onSubmit={handleSubmit}>
                                            <Form.Group className="mb-4">
                                                <Form.Label>
                                                    Username<span className="text-danger">*</span>
                                                </Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type="text"
                                                        className="form-control bg-light border-light password-input"
                                                        placeholder="Masukkan username"
                                                        id="username"
                                                        name="username"
                                                        value={formData.username}
                                                        required
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="">
                                                <Form.Label>
                                                    Password<span className="text-danger">*</span>
                                                </Form.Label>
                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                    <Form.Control
                                                        className="form-control bg-light border-light mb-5 password-input"
                                                        placeholder="Masukkan password"
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        required
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </Form.Group>

                                            <div className="pb-4">
                                                <Button
                                                    className="btn custom-button w-100 rounded-pill py-2"
                                                    type="submit"
                                                    variant="success"
                                                >
                                                    Sign In
                                                </Button>
                                            </div>
                                            <div className="text-center">
                                                <p>
                                                    <Link to="/register" className="nav-link">Sign Up</Link>
                                                </p>
                                            </div>
                                        </Form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}