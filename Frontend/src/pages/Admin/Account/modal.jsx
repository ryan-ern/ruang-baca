import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editAccount } from "../../../store/account/actions";

export default function ModalEditAccount({ show, onHide, editdata }) {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        nisn: '',
        name: '',
        username: '',
        jurusan: '',
        password: '',
        wa: '',
    })

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
                                <h4>Edit Data Akun </h4>
                            </Col>
                        </Row>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append('nisn', data.nisn);
                            formData.append('name', data.name);
                            formData.append('username', data.username);
                            formData.append('jurusan', data.jurusan);
                            formData.append('password', data.password);
                            formData.append('wa', data.wa);
                            // console.log(Object.fromEntries(formData));
                            dispatch(editAccount(data.username, formData, onHide))
                        }}>
                            <Row className="justify-content-center align-items-center">
                                <Col>
                                    <img
                                        src={editdata?.profile}
                                        className="mx-auto d-block rounded-circle"
                                        width="150"
                                        height="150"
                                    />
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
                                    <span className="form-control bg-light mb-4">
                                        {data.username}
                                    </span>
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
                                    <input
                                        type="text"
                                        name="jurusan"
                                        placeholder="Masukkan Jurusan"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.jurusan}
                                        required
                                        onChange={(e) => setData({...data, jurusan: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Whatsapp</label>
                                    <input
                                        required
                                        type="tel"
                                        pattern="^\+62\d{9,15}$"
                                        className="form-control bg-light border-light mb-4"
                                        placeholder="628123456789"
                                        id="wa"
                                        autoComplete="whatsapp"
                                        name="wa"
                                        value={data.wa || ''}
                                        onChange={(e) => {
                                            // Remove non-numeric characters from the input
                                            const sanitizedValue = e.target.value.replace(/\D/g, '');
                                            // Format the phone number as +62xxxxxxxxxxx
                                            const formattedValue = sanitizedValue.length > 2 ? `+62${sanitizedValue.slice(2)}` : sanitizedValue;
                                            setData({ ...data, wa: formattedValue });
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Masukkan Password"
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
                                                Edit Data
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