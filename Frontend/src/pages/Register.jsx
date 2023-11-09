import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Card, Col, Form } from "react-bootstrap";
import Waveup from "../components/background/Wavetop";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register (){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        nisn: "",
        nama: "",
        jurusan: "",
        whatsapp: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tambahkan logika untuk pengiriman data formulir jika diperlukan
        // Kemudian arahkan pengguna ke halaman beranda
        navigate("/") // Navigasi ke halaman beranda
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
            <Waveup color="#e0f8f2" />
            <div className="my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10} lg={10} xl={8}>
                            <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4">
                                <Card.Body className="p-sm-3">
                                    <div className="text-center">
                                        <h5>
                                            <strong>
                                                Silahkan Mendaftar untuk Mengakses RUANG BACA
                                            </strong>
                                        </h5>
                                    </div>
                                    <div className="p-2 mt-4">
                                        <Form action="#" onSubmit={handleSubmit}>
                                            <Row>
                                                <Col>
                                                    <Form.Group
                                                        className="mb-3"
                                                    >
                                                        <Form.Label>
                                                            NISN <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="Masukkan NISN"
                                                                id="nisn"
                                                                name="nisn"
                                                                value={formData.nisn}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col>
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
                                                                <option defaultChecked>Pilih Jurusan</option>
                                                                <option value={1}>Teknik Komputer & Jaringan</option>
                                                                <option value={2}>Pemasaran</option>
                                                                <option value={3}>Akuntansi</option>
                                                            </Form.Select>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Form.Group
                                                        className="mb-3"
                                                    >
                                                        <Form.Label>
                                                            Username <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="Masukkan Username"
                                                                id="username"
                                                                name="username"
                                                                value={formData.username}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                
                                                <Col>
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
                                                                placeholder="Masukkan Nomor Whatsapp"
                                                                id="whatsapp"
                                                                name="whatsapp"
                                                                value={formData.whatsapp}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <Form.Group
                                                        className="mb-3"
                                                    >
                                                        <Form.Label>
                                                            Nama Lengkap{" "}
                                                            <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="Masukkan Nama Lengkap"
                                                                id="nama"
                                                                name="nama"
                                                                value={formData.nama}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                

                                                <Col>
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
                                                                placeholder="Masukkan Password"
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
                                                    variant="success"
                                                >
                                                    Sign Up
                                                </Button>
                                            </div>
                                            <div className="text-center mt-3">
                                                <p>
                                                    <Link to="/" className="nav-link">Sign In</Link>
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