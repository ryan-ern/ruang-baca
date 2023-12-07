
import { Modal, Row, Col, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearBorrowMessage, postBorrow } from "../../../store/actions";
import { useNavigate } from "react-router-dom";

export default function ModalKetentuan({ show, onHide, data}) {
    const dispatch = useDispatch()
    const ketentuan = useSelector((state) => state.fined.response.denda)
    const borrowMessage = useSelector((state) => state.borrow.add.message)

    const navigate = useNavigate();
    const handleDismiss = () => {
        dispatch(clearBorrowMessage());
    };
    return (
        <>
            <Modal show={show} onHide={onHide} keyboard={false} centered size='md' className="custom-modal">
                <Modal.Body className="mb-3">
                    <Row className="ps-4">
                        <h3>Catatan</h3>
                    </Row>
                    <Row className="ps-4">
                        {borrowMessage && borrowMessage?.response?.data?.message ?
                            <Alert className="text-center" dismissible onClose={handleDismiss} variant="danger">{borrowMessage && borrowMessage?.response?.data?.message}</Alert> : null}
                        <p> {ketentuan?.text} </p>
                        {/* {console.log(data)} */}
                    </Row>
                    <Row className="ps-4">
                        <Col className=" d-flex justify-content-end">
                            <p>denda : </p>
                        </Col>
                        <Col>
                            <h5>Rp{ketentuan?.nominal} </h5>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="ps-5">                                                    
                            <Button onClick={onHide} type="button" className="btn-table rounded-pill" variant="danger">Batal</Button> 
                            
                            
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                            <Button type="submit" className="btn-table rounded-pill custom-button" variant="sucess" disabled={borrowMessage?.response?.data?.message}
                                onClick={()=>{
                                    dispatch(postBorrow(data, navigate))
                                }} >
                                       Setuju
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}
