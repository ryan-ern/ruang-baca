import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editAccount, postAccountAdmin, postAccountSuper } from "../../../store/account/actions";

export default function ModalAccount({ show, onHide, editdata, add }) {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        nisn: '',
        name: '',
        username: '',
        jurusan: '',
        password: '',
        wa: '',
    })

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
            <Modal show={show} onHide={onHide} centered>
                {/* <Modal.Header closeButton /> */}
                <Modal.Body style={{backgroundColor: '#e0f8f2', borderRadius: '10px'}}>
                    <Container>
                        <Row>
                            <Col>
                                <h4>{add? "Tambah Data Super / Admin" : "Edit Data Akun" }</h4>
                            </Col>
                        </Row>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (add === 'tambah') {
                                console.log(role)
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
                                    <label>NISN</label>
                                    <input
                                        type="text"
                                        name="nisn"
                                        placeholder="Masukkan NISN"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.nisn}
                                        required
                                        onChange={(e) => setData({...data, nisn: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Username</label>
                                    { add ? <input
                                        type="text"
                                        name="username"
                                        placeholder="Masukkan Username"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.username}
                                        required
                                        onChange={(e) => setData({...data, username: e.target.value})}
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
                                    <label>Nama</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        placeholder="Masukkan Nama"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.name}
                                        required
                                        onChange={(e) => setData({...data, name: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Jurusan</label>
                                    {add ? <span className="form-control bg-light mb-4">
                                        {data.jurusan}
                                    </span>
                                        :
                                        <input
                                            type="text"
                                            name="jurusan"
                                            placeholder="Masukkan Jurusan"
                                            className="form-control bg-light mb-4"
                                            defaultValue={data.jurusan}
                                            required
                                            onChange={(e) => setData({...data, jurusan: e.target.value})}
                                        />
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Whatsapp</label>
                                    <input
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
                            <Row>
                                <Col>
                                    <label>Role</label>
                                    <select name="role" onChange={(e) => {
                                        setRole({ ...role, role: e.target.value });
                                    }} className="form-select bg-light border-light mb-4">
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Superadmin</option>
                                    </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Masukkan Password"
                                        autoComplete="password"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.password}
                                        required
                                        onChange={(e) => setData({...data, password: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="float-end mt-2">
                                        <div className="d-flex flex-wrap gap-2">
                                            <button onClick={onHide} type="button" className="btn btn-danger px-3">Batal</button>
                                            <button type="submit" className="btn btn-success px-3">
                                                {add? 'Tambah data':  "Edit Data"}
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}