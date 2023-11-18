import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Wavebot from "../../../components/background/Wavebot";
import Waveup from "../../../components/background/Wavetop";
// import { Link } from "react-router-dom";
import "../../../assets/styles/common.css";
import IMAGES from "../../../assets/images";

export default function Profil(){
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
                                    <Row>
                                        <Col lg={8}>
                                            <div className="pic-profil">
                                                <img
                                                    src={IMAGES.profil}
                                                    width="100"
                                                    height="100"
                                                    className="d-inline-block align-top rounded-circle me-2"
                                            
                                                />
                                            </div>
                                        </Col>
                                        <Col className="button-profil">
                                            <Button
                                                className="btn-table custom-button rounded-pill"
                                                type="submit"
                                                variant="success"
                                            >
                                                Edit Profil
                                            </Button></Col>
                                    </Row>
                                    <div className="p-2 mt-4">
                                        <Form action="#" >
                                            <Row className="g-2">
                                                <Col md>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>
                                                            NISN 
                                                            {/* <span className="text-danger">*</span> */}
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                required
                                                                placeholder=""
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
                                                            {/* <span className="text-danger">*</span> */}
                                                        </Form.Label>
                                                        <div className="position-relative">
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder=""
                                                                autoComplete="username"
                                                                id="username"
                                                                name="username"
                                                                disabled
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="g-2">
                                                <Col md><Form.Group className="mb-3">
                                                    <Form.Label>
                                                            Nama Lengkap{" "}
                                                        {/* <span className="text-danger">*</span> */}
                                                    </Form.Label>
                                                    <div className="position-relative">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            className="form-control bg-light border-light password-input"
                                                            placeholder=""
                                                            id="nama"
                                                            autoComplete="nama"
                                                            name="nama"
                                                            disabled
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
                                                                type="text"
                                                                className="form-control bg-light border-light password-input"
                                                                placeholder=""
                                                                id="whatsapp"
                                                                autoComplete="whatsapp"
                                                                name="whatsapp"
                                                                disabled
                                                                
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
                                                            Jurusan <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <div className="position-relative">
                                                        <Form.Select
                                                            className="form-control bg-light border-light password-input"
                                                            disabled
                                                            autoComplete="jurusan"
                                                        >
                                                            <option value={""}>Pilih Jurusan</option>
                                                            <option>
                                                                        Teknik Komputer & Jaringan
                                                            </option>
                                                            <option >Pemasaran</option>
                                                            <option >Akuntansi</option>
                                                        </Form.Select>
                                                    </div>
                                                </Form.Group>
                                                    
                                                </Col>

                                                <Col className="button-profil">
                                                    <Button
                                                        className="rounded-pill ps-2 pe-2 btn-prf"
                                                        type="submit"
                                                        variant="danger"
                                                    >
                                                    Logout
                                                    </Button>
                                                </Col>
                                            </Row>
                                            
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