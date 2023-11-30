import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Wavebot from "../../../components/background/Wavebot";
import Waveup from "../../../components/background/Wavetop";
// import { Link } from "react-router-dom";
import "../../../assets/styles/common.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/auth/actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearEditProfileMessage, putProfil } from "../../../store/actions";

export default function Profil() {
    const profile = useSelector((state) => state.auth.response.data)
    const editProfile = useSelector((state) => state.profil.message?.message)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)
    const [editAvatar, setEditAvatar] = useState(false)
    const [data, setData] = useState({
        nisn: "",
        file: "",
        name: "",
        username: "",
        jurusan: "",
        wa: "",
    });
    const handleClick = () => {
        setEditMode(!editMode)
    }
    const handleClickAvatar = () => {
        setEditAvatar(!editAvatar)
    }
    const handleClickfalse = () => {
        setEditMode(false)
        setEditAvatar(false)
    }
    const handleDismiss = () => {
        dispatch(clearEditProfileMessage());
    };
  

    return(
        <>
            <Waveup color="#B6D8CF" />
            <Wavebot color="#B6D8CF" />
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={10} lg={10} xl={8}>
                            <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4 mt-2">
                                <Card.Body className="p-sm-3">
                                    {editProfile ?
                                        <Alert
                                            variant="success"
                                            className="text-center"
                                            dismissible
                                            onClose={handleDismiss}
                                        >
                                            {editProfile}
                                        </Alert>
                                        :
                                        null}
                                    <Form action="#"  onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData();
                                        formData.append('file', data.file || profile.profile);
                                        formData.append('nisn', data.nisn || profile.nisn);
                                        formData.append('name', data.name || profile.name);
                                        formData.append('username', data.username || profile.username);
                                        formData.append('jurusan', data.jurusan || profile.jurusan);
                                        formData.append('wa', data.wa || profile.wa);
                                        dispatch(putProfil(formData));
                                        setEditMode(false)
                                        setEditAvatar(false)
                                    }}>
                                        <Row>
                                            <Col lg={8} sm={5} xs={6}>
                                                {editAvatar ?
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>
                                                            Foto Profil
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <input
                                                                type="file"
                                                                accept="image/png"
                                                                className="form-control bg-light border-light"
                                                                required
                                                                onChange={(e) => {
                                                                    const selectedFile = e.target.files[0];
                                                                    setData({ ...data, file: selectedFile })
                                                                }}
                                                                autoComplete="file"
                                                                id="file"
                                                                name="file"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                    :    
                                                    <div className="pic-profil">
                                                        <img
                                                            src={profile.profile}
                                                            width="100"
                                                            height="100"
                                                            className="d-inline-block align-top rounded-circle me-2"
                                                        />
                                                    </div>
                                                }
                                            </Col>
                                            <Col className="button-profil">
                                                {editMode ?
                                                    <Button
                                                        className="btn-table rounded-pill"
                                                        variant="outline-dark"
                                                        onClick={handleClickAvatar}
                                                    >
                                                Ganti Foto
                                                    </Button>
                                                    :
                                                    <Button
                                                        className="btn-table custom-button rounded-pill"
                                                        variant="success"
                                                        onClick={handleClick}
                                                    >
                                                Edit Profil
                                                    </Button>
                                                }
                                            </Col>
                                        </Row>
                                        <div className="p-2 mt-4">
                                            <Row className="g-2">
                                                <Col md>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>
                                                            NISN 
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light"
                                                                required
                                                                placeholder=""
                                                                defaultValue={profile.nisn}
                                                                onChange={(e) => setData({...data, nisn: e.target.value})}
                                                                autoComplete="nisn"
                                                                id="nisn"
                                                                name="nisn"
                                                                disabled
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col md>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>
                                                        Username 
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                className="form-control bg-light border-light"
                                                                placeholder=""
                                                                autoComplete="username"
                                                                id="username"
                                                                name="username"
                                                                onChange={(e) => setData({...data, username: e.target.value})}
                                                                defaultValue={profile.username}
                                                                disabled
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="g-2">
                                                <Col md><Form.Group className="mb-3">
                                                    <Form.Label>
                                                            Nama Lengkap
                                                        <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <div className="position-relative">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            className="form-control bg-light border-light "
                                                            placeholder=""
                                                            id="nama"
                                                            autoComplete="nama"
                                                            onChange={(e) => setData({...data, name: e.target.value})}
                                                            defaultValue={profile.name}
                                                            name="nama"
                                                            disabled={!editMode}
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
                                                            WhatsApp
                                                            <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                required
                                                                type="tel"
                                                                className="form-control bg-light border-light "
                                                                pattern="^\08\d{9,15}$"
                                                                placeholder="08123456789"
                                                                defaultValue={profile.wa}
                                                                onChange={(e) => setData({...data, wa: e.target.value})}
                                                                id="whatsapp"
                                                                autoComplete="whatsapp"
                                                                name="whatsapp"
                                                                disabled={!editMode}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="g-2">
                                                <Col md><Form.Group
                                                    className="mb-3"
                                                    style={{ marginRight: "10px" }}
                                                >
                                                    <Form.Label>
                                                        Jurusan
                                                    </Form.Label>
                                                    <div className="position-relative">
                                                        <Form.Control
                                                            type="text"
                                                            className="form-control bg-light border-light "
                                                            disabled
                                                            autoComplete="jurusan"
                                                            defaultValue={profile.jurusan}
                                                        >
                                                        </Form.Control>
                                                    </div>
                                                </Form.Group>
                                                    
                                                </Col>

                                                <Col className="button-profil">
                                                    {editMode ?
                                                        <div>
                                                            <Button
                                                                className="rounded-pill ps-4 pe-4 mt-5 mx-3"
                                                                variant="warning"
                                                                onClick={handleClickfalse}
                                                            >
                                                            batal
                                                            </Button>
                                                            <Button
                                                                className="rounded-pill ps-4 pe-4 mt-5"
                                                                type="submit"
                                                                variant="success"
                                                            >
                                                            Simpan
                                                            </Button>
                                                        </div>
                                                        :
                                                        <Button
                                                            className="rounded-pill ps-4 pe-4 mt-5"
                                                            type="submit"
                                                            variant="danger"
                                                            onClick={(e) => { e.preventDefault(); dispatch(logout(navigate))}}
                                                        >
                                                            Logout
                                                        </Button>
                                                    }
                                                </Col>
                                            </Row>
                                        </div>
                                        <span className="fs-6 text-body-secondary text-capitalize">
                                                    Keterangan: <br/>
                                                    Hanya Dapat Mengubah Nama Lengkap, Nomor Whatsapp, dan Foto Profil
                                        </span>
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