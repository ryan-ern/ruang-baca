import { Modal, Row, Col, Button } from "react-bootstrap";
import { deleteAccount, deleteInventory } from "../store/actions";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { postBorrow } from "../store/borrow/actions";

export default function ModalKonfirmasi({ show, onHide, data, event }) {
    const dispatch = useDispatch()
    // const navigate = useNavigate();
    return (
        <>
            <Modal show={show} onHide={onHide} keyboard={false} centered size='md' className="custom-modal">
                {/* <Modal.Header closeButton /> */}
                <Modal.Body className="mb-3">
                    <Row className="ps-4">
                        <h3>Catatan</h3>
                    </Row>
                    <Row className="ps-4">
                        <p>Apakah anda ingin menghapus : {data}</p>
                        {/* {console.log(data)} */}
                    </Row>
                    <Row className="mt-4">
                        <Col className="ps-5">                                                    
                            <Button onClick={onHide} type="button" className="btn-table rounded-pill" variant="danger">Batal</Button> 
                            
                            
                        </Col>
                        <Col className=" d-flex justify-content-center"> 
                            <Button type="submit" className="btn-table rounded-pill custom-button" variant="sucess" 
                                onClick={()=>{
                                    event==="inventory" ? dispatch(deleteInventory(data, onHide)) : dispatch(deleteAccount(data, onHide))
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
