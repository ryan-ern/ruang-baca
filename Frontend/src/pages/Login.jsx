import Row from "react-bootstrap/Row";
import { Button, Card, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/login.css"
import Waveup from "../components/background/Wavetop";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = "/panel";
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
            <Waveup color="#FFFFFF"/>
            <Row className="py-lg-5 py-5">
                <Col>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Card className="w-20 m-3 mb-0 border-0 shadow-lg p-3 pb-0 bg-white rounded-4 mb-0">
                            <Card.Body className="p-sm-3">
                                <div className="text-center">
                                    <h5 className="fs-3xl">
                                        <strong>Selamat Datang di RUANG BACA</strong>
                                        <br />
                                        <strong>SMK NEGERI 7 BANDAR LAMPUNG</strong>
                                    </h5>
                                    <p className="text-muted">
                      Input username & password untuk masuk
                                    </p>
                                </div>
                                <div className="p-2 mt-4 ">
                                    <Form action="#" onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                          Username <span className="text-danger">*</span>
                                            </Form.Label>
                                            <div className="position-relative">
                                                <Form.Control
                                                    type="text"
                                                    className="form-control bg-light border-light password-input"
                                                    placeholder="masukkan username"
                                                    id="username"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>
                          Password <span className="text-danger">*</span>
                                            </Form.Label>
                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                <Form.Control
                                                    className="form-control bg-light border-light pe-5 password-input"
                                                    placeholder="masukkan password"
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />

                                                <button
                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                    type="button"
                                                    id="password-addon"
                                                >
                                                    <i className="ri-eye-fill align-middle"></i>
                                                </button>
                                            </div>
                                        </Form.Group>

                                        <div className="mt-4">
                                            <Button
                                                className="btn custom-button w-100 rounded-pill"
                                                type="submit"
                                            >
                          Sign In
                                            </Button>
                                        </div>
                                        <div className="text-center mt-3">
                                            <p>
                                                <Link to="/register">Sign Up</Link>
                                            </p>
                                        </div>
                                    </Form>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default Login;
