import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Card, Col, Form } from "react-bootstrap";
import Waveup from "../../components/background/Wavetop";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../store/auth/actions";
import { jurusan } from "../../store/actions";

export default function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector((state) => state.auth)
    const dataJurusan = useSelector((state) => state.major.response)

    const [account, setAccount] = useState({
        username: "",
        password: "",
        nisn: "",
        name: "",
        jurusan: "",
        wa: "",
    });
    useEffect(() => {
        if (auth.isLogin) navigate('/panel');
        dispatch(jurusan())
    }, [])
    return (
        <>
            <Waveup color="#e0f8f2" bg="#ffffff" />
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
                                        <Form action="#" onSubmit={(e) => {
                                            e.preventDefault();
                                            dispatch(register(account, navigate));
                                        }}>
                                            <Row className="g-2">
                                                <Col md>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>
                              NISN <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                required
                                                                placeholder="Masukkan NISN"
                                                                autoComplete="nisn"
                                                                id="nisn"
                                                                name="nisn"
                                                                value={account.nisn}
                                                                onChange={(e) => {
                                                                    setAccount({ ...account, nisn: e.target.value });
                                                                }}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col md>
                                                    <Form.Group
                                                        className="mb-3"
                                                        style={{ marginRight: "10px" }}
                                                    >

                                                        {/* <label>Jurusan</label>
                                    <select
                                        className="form-control bg-light"
                                        name="jurusan"
                                        value={data.jurusan}
                                        onChange={(e) => setData({ ...data, jurusan: e.target.value })}
                                        required={data.jurusan === ""}
                                    >
                                        <option value="">--Pilih Jurusan--</option>
                                        <option value="lainnya">lainnya</option>
                                        {Array.isArray(dataJurusan?.data?.jurusan) &&
                                            dataJurusan?.data?.jurusan.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select> */}
                                                        <Form.Label>
                              Jurusan <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Select
                                                                className="form-control bg-light border-light password-input"
                                                                onChange={(e) => {
                                                                    setAccount({ ...account, jurusan: e.target.value });
                                                                }}
                                                                required={account.jurusan === ""}
                                                                autoComplete="jurusan"
                                                            >
                                                                <option value="">--Pilih Jurusan--</option>
                                                                {Array.isArray(dataJurusan?.data?.jurusan) &&
                                                                    dataJurusan?.data?.jurusan.map((item) => (
                                                                        <option key={item.id} value={item.name}>
                                                                            {item.name}
                                                                        </option>
                                                                    ))}
                                                            </Form.Select>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="g-2">
                                                <Col md>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>
                              Username <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="Masukkan Username"
                                                                autoComplete="username"
                                                                id="username"
                                                                name="username"
                                                                value={account.username || ''}
                                                                onChange={(e) => {
                                                                    setAccount({ ...account, username: e.target.value });
                                                                }}
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
                              WhatsApp <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                required
                                                                type="tel"
                                                                pattern="^\08\d{9,15}$"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="08123456789"
                                                                id="whatsapp"
                                                                autoComplete="whatsapp"
                                                                name="whatsapp"
                                                                value={account.wa || ''}
                                                                onChange={(e) => {
                                                                    setAccount({ ...account, wa: e.target.value });
                                                                }}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="g-2">
                                                <Col md>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>
                              Nama Lengkap{" "}
                                                            <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder="Masukkan Nama Lengkap"
                                                                id="nama"
                                                                autoComplete="nama"
                                                                name="nama"
                                                                value={account.name || ''}
                                                                onChange={(e) => {
                                                                    setAccount({ ...account, name: e.target.value });
                                                                }}
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
                                                                required
                                                                className="form-control bg-light border-light pe-5 password-input"
                                                                placeholder="Masukkan Password"
                                                                type="password"
                                                                id="password"
                                                                autoComplete="password"
                                                                name="password"
                                                                value={account.password || ''}
                                                                onChange={(e) => {
                                                                    setAccount({ ...account, password: e.target.value });
                                                                }}
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
                                                    <Link to="/" className="nav-link">
                            Sign In
                                                    </Link>
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
