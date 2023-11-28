import { Modal, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBorrow } from "../store/borrow/actions";

export default function ModalDetailBuku({ show, onHide, data, inv }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return (
        <>
            <Modal show={show} onHide={onHide} keyboard={false} centered size='lg' className="custom-modal">
                {/* <Modal.Header closeButton /> */}
                <Modal.Body className="p-5"  style={{ backgroundColor: '#e0f8f2', borderRadius: '25px'}}>
                    <Row className="g-2">
                        <Col md className="me-5 mb-5">
                            <img src={data?.cover || data?.file} alt={data?.judul} width="155px" 
                                style={{
                                    borderRadius: "6px",
                                    
                                    objectFit: "cover",
                                    width: "100%",
                                }}/>
                        </Col>
                        <Col lg="9" md>
                            <Row className="g-2 mb-3">
                                <Col md >
                                    <h4>{data?.judul}</h4>
                                </Col>
                                {inv ? null :
                                    <Col lg="4" md className=" d-flex justify-content-end">
                                        <form action="#" onSubmit={(e) => {
                                            e.preventDefault();
                                            dispatch(postBorrow(data.isbn, navigate))
                                        }}>
                                            <Button variant="success" type="submit" className="btn-table rounded-pill custom-button">Pinjam</Button>
                                        </form>
                                    </Col>
                                }
                            </Row>
                            <Row className="g-2">
                                <Row>
                                    <Col lg="4" className="ps-1">ISBN</Col>
                                    <Col >: {data?.isbn}</Col>
                                </Row>
                                <Row>
                                    <Col lg="4" className="ps-1">Penulis</Col>
                                    <Col>: {data?.penulis || "-"}</Col>
                                </Row>
                                <Row>
                                    <Col lg="4" className="ps-1">Tahun Terbit</Col>
                                    <Col>: {data?.tahun_terbit}</Col>
                                </Row>
                                <Row>
                                    <Col lg="4" className="ps-1">Penerbit</Col>
                                    <Col>: {data?.penerbit}</Col>
                                </Row>
                                <Row>
                                    <Col lg="4" className="ps-1">Jumlah Halaman</Col>
                                    <Col>: {data?.jumlah_halaman}</Col>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5>
                                Sinopsis
                            </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ whiteSpace: 'pre-line', textAlign: 'justify'}}>
                            {data?.sinopsis}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}
