import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Card, Col, Form } from "react-bootstrap";
import Waveup from "../components/background/Wavetop";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register (){
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        nisn: "",
        nama: "",
        jurusan: ["Teknik Komputer & Jaringan"],
        whatsapp: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tambahkan logika untuk pengiriman data formulir jika diperlukan
        // Kemudian arahkan pengguna ke halaman beranda
        window.location.href = "/"; // Navigasi ke halaman beranda
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
            <Waveup color="#ffffff" />
            <Container className="py-5">
                <Row className="py-lg-5">
                    <Col>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Card className="w-20 mb-0 border-0 shadow-lg bg-white rounded-4 custom-card">
                                <Card.Body className="p-sm-3">
                                    <div className="text-center">
                                        <h5 className="fs-3xl" style={{ fontFamily: "Montserrat" }}>
                                            <strong>
                        Silahkan Mendaftar untuk Mengakses RUANG BACA
                                            </strong>
                                        </h5>
                                    </div>
                                    <div className="p-2 mt-4">
                                        <Form action="#" onSubmit={handleSubmit}>
                                            <Row className="g-2">
                                                <Col md>
                                                    <Form.Group
                                                        className="mb-3"
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        <Form.Label>
                              NISN <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="masukkan NISN"
                                                                id="nisn"
                                                                name="nisn"
                                                                value={formData.nisn}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col md>
                                                    <Form.Group
                                                        className="mb-3"
                                                        style={{ marginRight: "10px" }}
                                                    >
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
                                                </Col>
                                            </Row>

                                            <Row className="g-2">
                                                <Col md>
                                                    <Form.Group
                                                        className="mb-3"
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        <Form.Label>
                              Nama Lengkap{" "}
                                                            <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="masukkan nama lengkap"
                                                                id="nama"
                                                                name="nama"
                                                                value={formData.nama}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col md>
                                                    <Form.Group
                                                        className="mb-3"
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        <Form.Label>
                              Jurusan <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Select
                                                                className="form-control bg-light border-light password-input"
                                                                onChange={handleChange}
                                                            >
                                                                <option>{formData.jurusan}</option>
                                                            </Form.Select>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="g-2">
                                                <Col md>
                                                    <Form.Group
                                                        className="mb-3"
                                                        style={{ marginRight: "10px" }}
                                                    >
                                                        <Form.Label>
                              WhatsApp <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="masukkan nomor whatsapp"
                                                                id="whatsapp"
                                                                name="whatsapp"
                                                                value={formData.whatsapp}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col md>
                                                    <Form.Group
                                                        className="mb-3"
                                                        style={{ marginRight: "10px" }}
                                                    >
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
                                                </Col>
                                            </Row>

                                            <div className="mt-4 text-center">
                                                <Button
                                                    className="btn custom-button w-50 rounded-pill"
                                                    type="submit"
                                                >
                          Sign Up
                                                </Button>
                                            </div>
                                            <div className="text-center mt-3">
                                                <p>
                                                    <Link to="/">Sign In</Link>
                                                </p>
                                            </div>
                                        </Form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}