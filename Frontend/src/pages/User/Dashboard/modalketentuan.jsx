import { useEffect } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
// import { deleteAccount, deleteInventory } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { getFined, postBorrow } from "../../../store/actions";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { postBorrow } from "../store/borrow/actions";

export default function ModalKetentuan({ show, onHide, data}) {
    const dispatch = useDispatch()
    const ketentuan = useSelector((state)=>state.fined.response.denda)
    useEffect(()=>{
        dispatch(getFined())
    },[])
    const navigate = useNavigate();
    console.log(ketentuan)
    return (
        <>
            <Modal show={show} onHide={onHide} keyboard={false} centered size='md' className="custom-modal">
                {/* <Modal.Header closeButton /> */}
                <Modal.Body className="mb-3">
                    <Row className="ps-4">
                        <h3>Catatan</h3>
                    </Row>
                    <Row className="ps-4">
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
                            <Button type="submit" className="btn-table rounded-pill custom-button" variant="sucess" 
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
