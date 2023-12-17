import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editAccount, postAccountAdmin, postAccountSuper } from "../../../store/account/actions";

export default function ModalAccount({ show, onHide, editdata, add }) {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const dataJurusan = useSelector((state) => state.major.response)
    const [data, setData] = useState({
        nisn: '',
        name: '',
        username: '',
        jurusan: '',
        password: '',
        wa: '',
    })

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [role, setRole] = useState(null)

    useEffect(() => {
        if (editdata) {
            setData({
                nisn: editdata.nisn || '',
                name: editdata.name || '',
                username: editdata.username || '',
                jurusan: editdata.jurusan || '',
                password: editdata.password || '',
                wa: editdata.wa || '',
            });
        }
        if (add === 'tambah') {
            // Jika mode tambah, set data ke default
            setData({
                nisn: '',
                name: '',
                username: '',
                jurusan: '-',
                password: '',
                wa: '',
            });
        }
        if (!show) {
            setData({
                nisn: '',
                name: '',
                username: '',
                jurusan: '',
                password: '',
                wa: '',
            });
        }
        // dispatch(inventory())
    }, [show])
    return (
        <>
            <Modal show={show} onHide={onHide} centered className="custom-modal">
                {/* <Modal.Header closeButton /> */}
                <Modal.Body style={{ backgroundColor: '#e0f8f2', borderRadius: '25px' }} className="custom-modal-body pb-5">
                    <Container>
                        <Row>
                            <Col>
                                <h4>{add ? "Tambah Data Super / Admin" : "Edit Data Akun"}</h4>
                            </Col>
                        </Row>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            if (add === 'tambah') {
                                if (role) {
                                    dispatch(postAccountAdmin(data, onHide))
                                } else {
                                    dispatch(postAccountSuper(data, onHide))
                                }
                            } else {
                                dispatch(editAccount(data.username, data, onHide))
                            }
                        }}>
                            <Row className="justify-content-center align-items-center">
                                <Col>
                                    {add ? null :
                                        <img
                                            src={editdata?.profile}
                                            className="mx-auto d-block rounded-circle"
                                            width="150"
                                            height="150"
                                        />
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>NISN</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nisn"
                                        placeholder="Masukkan NISN"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.nisn}
                                        required
                                        onChange={(e) => setData({ ...data, nisn: e.target.value })}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Username</Form.Label>
                                    {add ? <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Masukkan Username"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.username}
                                        required
                                        onChange={(e) => setData({ ...data, username: e.target.value })}
                                    />
                                        :
                                        <span className="form-control bg-light mb-4">
                                            {data.username}
                                        </span>
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nama"
                                        placeholder="Masukkan Nama"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.name}
                                        required
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Jurusan</label>
                                    <select
                                        className="form-control bg-light mb-4"
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
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>Whatsapp</Form.Label>
                                    <Form.Control
                                        required
                                        type="tel"
                                        pattern="^08\d{9,15}$"
                                        className="form-control bg-light border-light mb-4"
                                        placeholder="08123456789"
                                        id="wa"
                                        autoComplete="whatsapp"
                                        name="wa"
                                        value={data.wa || ''}
                                        onChange={(e) => {

                                            setData({ ...data, wa: e.target.value });
                                        }}
                                    />
                                </Col>
                            </Row>
                            {editdata ? null :
                                <Row>
                                    <Col>
                                        <Form.Label>Role</Form.Label>
                                        <Form.Select name="role" onChange={(e) => {
                                            setRole({ ...role, role: e.target.value });
                                        }} className="form-control bg-light border-light mb-4">
                                            <option value="admin">Admin</option>
                                            <option value="superadmin">Superadmin</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            }
                            <Row>
                                <Col>
                                    <Form.Group className="">
                                        <Form.Label>Password</Form.Label>
                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="Masukkan Password"
                                                autoComplete="password"
                                                className="form-control password-input bg-light mb-4"
                                                defaultValue={data.password}
                                                required
                                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                            />
                                            <div className="password-toggle-icon" onClick={handleTogglePassword}>
                                                {showPassword ? '🙈' : '👀'}
                                            </div>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="float-end mt-2">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button onClick={onHide} variant="danger" className="btn-table rounded-pill">Batal</Button>
                                            <Button type="submit" className="btn-table rounded-pill custom-button" variant="success">
                                                {add ? 'Tambah data' : "Edit Data"}
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}