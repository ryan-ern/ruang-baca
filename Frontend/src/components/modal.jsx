import { Modal, Row, Col, Alert, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearBorrowMessage } from "../store/borrow/actions";
import { useState } from "react";
import ModalKetentuan from "../pages/User/Dashboard/modalketentuan";

export default function ModalDetailBuku({ show, onHide, data, inv }) {
    const borrowMessage = useSelector((state) => state.borrow.add.message)
    const dispatch = useDispatch()

    const handleDismiss = () => {
        dispatch(clearBorrowMessage());
    };
    const [onShow, setonShow] = useState(false)

    const handleClick = () => {
        setonShow(true)
        onHide()

    }
    const handleClose = () => {
        setonShow(false)
    }


    return (
        <>
            <Modal show={show} onHide={onHide} keyboard={false} centered size='lg' className="custom-modal">

                <Modal.Body style={{ backgroundColor: '#e0f8f2', borderRadius: '25px' }} className="custom-modal-body">
                    <Row>
                        {inv ? null :
                            borrowMessage ?
                                <Alert className="text-center" dismissible onClose={handleDismiss} variant="info">{borrowMessage && borrowMessage?.response?.data?.message || borrowMessage.message}</Alert> : null
                        }
                        <Col lg="3" className=" text-center" >
                            <img src={data?.cover || data?.file} alt={data?.judul} width="155px" className="image-modal" />
                        </Col>
                        <Col lg="9" md>
                            <Row className="g-2 mb-3">
                                <Col md className="judul-buku">
                                    <h4>{data?.judul}</h4>
                                </Col>
                                {inv ? null :
                                    <Col lg="4" md className=" btn-pinjam">
                                        <form action="#" onSubmit={(e) => {
                                            e.preventDefault();
                                            // dispatch(postBorrow(data.isbn, navigate))
                                        }}>
                                            <Button variant="success" disabled={data?.ready === 0} onClick={handleClick} className="btn-table rounded-pill custom-button">Pinjam</Button>
                                        </form>
                                    </Col>
                                }
                            </Row>
                            <Row className="g-2 mb-4">
                                <Row >
                                    <Col className="ps-1">ISBN</Col>
                                    <Col >: {data?.isbn}</Col>

                                </Row>
                                <Row>
                                    <Col className="ps-1">Penulis</Col>
                                    <Col>: {data?.penulis || "-"}</Col>
                                </Row>
                                <Row>
                                    <Col className="ps-1">Tahun Terbit</Col>
                                    <Col>: {data?.tahun_terbit}</Col>
                                </Row>
                                <Row>
                                    <Col className="ps-1">Penerbit</Col>
                                    <Col>: {data?.penerbit}</Col>
                                </Row>
                                <Row>
                                    <Col className="ps-1">Jumlah Halaman</Col>
                                    <Col>: {data?.jumlah_halaman}</Col>
                                </Row>
                                <Row>
                                    <Col className="ps-1">Stok</Col>
                                    <Col>: {data?.ready || data?.stok_buku}</Col>
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
                        <Col style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                            {data?.sinopsis}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            <ModalKetentuan show={onShow} onHide={handleClose} data={data?.isbn} />
        </>
    );
}
