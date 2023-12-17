import { Button, Card, Col, Form, Row, Container, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Waveup from "../../components/background/Wavetop";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../store/auth/actions";
import { isEdge } from "react-device-detect";

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth)
    const messageError = useSelector((state) => state.auth?.message?.data)

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };


    const [account, setAccount] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (auth.isLogin) navigate('/panel');
    }, [])

    return (
        <>
            <Waveup color="#e0f8f2" bg="#ffffff" />
            {
                (!auth.isSignIn) ? (
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
                                            {messageError ?
                                                <Alert variant="danger">{messageError.message}</Alert> :
                                                (auth.message ?
                                                    <Alert variant="danger">{auth.message}</Alert>
                                                    : null)
                                            }
                                            <div>
                                                <Form action="#" onSubmit={(e) => {
                                                    e.preventDefault();
                                                    dispatch(login(account, navigate));
                                                }}>
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
                                                                autoComplete="username"
                                                                value={account.username || ''}
                                                                required
                                                                onChange={(e) => {
                                                                    setAccount({ ...account, username: e.target.value });
                                                                }}
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

                                                                type={showPassword ? "text" : "password"}
                                                                id="password"
                                                                name="password"
                                                                autoComplete="current-password"
                                                                value={account.password || ''}
                                                                required
                                                                onChange={(e) => {
                                                                    setAccount({ ...account, password: e.target.value });
                                                                }}

                                                            />
                                                            {!isEdge && (
                                                                <div className="password-toggle-icon" onClick={handleTogglePassword}>
                                                                    {showPassword ? '🙈' : '👀'}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Form.Group>
                                                    <div className="pb-4">
                                                        <Button
                                                            className="btn custom-button w-100 rounded-pill"
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
                ) : null
            }
        </>
    );
}