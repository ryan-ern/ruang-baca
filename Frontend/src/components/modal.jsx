import { Modal, Row, Col, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearBorrowMessage, postBorrow } from "../store/borrow/actions";

export default function ModalDetailBuku({ show, onHide, data, inv }) {
    const borrowMessage = useSelector((state) => state.borrow.add.message)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleDismiss = () => {
        dispatch(clearBorrowMessage());
    };
    return (
        <>
            <Modal show={show} onHide={onHide} keyboard={false} centered size='lg'>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Row>
                        <Col lg="3">
                            {borrowMessage ?
                                <Alert className="text-center" dismissible onClose={handleDismiss} variant="danger">{borrowMessage && borrowMessage.response.data.message}</Alert> : null
                            }
                            <img src={data?.cover || data?.file} alt={data?.judul} width="155px" />
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
