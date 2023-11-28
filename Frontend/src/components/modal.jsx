import { Modal, Row, Col, Alert } from "react-bootstrap";
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
                        <Col lg="9">
                            <Row>
                                <Col>
                                    <h4>{data?.judul}</h4>
                                </Col>
                                {inv ? null :
                                    <Col lg="3">
                                        <form action="#" onSubmit={(e) => {
                                            e.preventDefault();
                                            dispatch(postBorrow(data.isbn, navigate))
                                        }}>
                                            <button type="submit" className="btn btn-success px-3 my-3">Pinjam</button>
                                        </form>
                                    </Col>
                                }
                            </Row>
                            <Row>
                                <Row>
                                    <Col>ISBN</Col>
                                    <Col>{data?.isbn}</Col>
                                </Row>
                                <Row>
                                    <Col>Penulis</Col>
                                    <Col>{data?.penulis || "-"}</Col>
                                </Row>
                                <Row>
                                    <Col>Tahun Terbit</Col>
                                    <Col>{data?.tahun_terbit}</Col>
                                </Row>
                                <Row>
                                    <Col>Penerbit</Col>
                                    <Col>{data?.penerbit}</Col>
                                </Row>
                                <Row>
                                    <Col>Jumlah Halaman</Col>
                                    <Col>{data?.jumlah_halaman}</Col>
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
                        <Col>
                            {data?.sinopsis}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}
