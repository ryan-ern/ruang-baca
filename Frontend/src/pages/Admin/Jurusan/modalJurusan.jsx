import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../../../assets/styles/common.css";
import { patchJurusan, postJurusan } from "../../../store/actions";

export default function ModalJurusan({ show, onHide, editdata }) {
    const dispatch = useDispatch()
    const [editphoto, setEditPhoto] = useState(false)
    const [data, setData] = useState({
        id: '',
        name: '',
        photo: '',
    })

    useEffect(() => {
        if (editdata) {
            setData({
                id: editdata.id || '',
                name: editdata.name || '',
                photo: editdata.photo || '',
            });
        }
        if (!show) {
            setData({
                id: '',
                name: '',
                photo: '',
            });
            setEditPhoto(false)
        }
        // dispatch(inventory())
    }, [show])
    return (
        <>
            <Modal show={show} onHide={onHide} centered size='lg' className="custom-modal">
                {/* <Modal.Header closeButton /> */}
                <Modal.Body style={{ backgroundColor: '#e0f8f2', borderRadius: '25px',}} className="custom-modal-body pb-5">
                    <Container>
                        <Row>
                            <Col>
                                <h4>{editdata ? "Edit Data Jurusan" : "Tambah Data Jurusan"}</h4>
                            </Col>
                        </Row>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append('id', data.id);
                            formData.append('name', data.name);
                            formData.append('photo', data.photo);
                            
                            // console.log(Object.fromEntries(formData))
                            {
                                editdata ?
                                    dispatch(patchJurusan(data.id, formData, onHide))
                                    :
                                    dispatch(postJurusan(formData, onHide))
                            }
                        }}>
                            <Row>
                                <Col md>
                                    <label>Nama</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Masukkan Nama Jurusan"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.name}
                                        required
                                        onChange={(e) => setData({...data, name: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md>

                                    {editdata ? editphoto ?
                                        <input
                                            type="file"
                                            accept="image/png"
                                            name="photo"
                                            placeholder="Masukkan Icon Jurusan"
                                            className="form-control bg-light"
                                            required
                                            onChange={(e) => {
                                                const selectedFile = e.target.files[0];
                                                setData({ ...data, photo: selectedFile });}}
                                        />
                                        :
                                        <div>
                                            <label>Icon Jurusan</label>
                                            <div>
                                                <img src={data.photo} alt={data.name}
                                                    width="100"
                                                    height="100"
                                                    className="d-inline-block align-top rounded-circle me-2" />
                                            </div>
                                            <div>
                                                <button className="btn btn-info px-3 mt-3" onClick={()=>setEditPhoto(true)}> Edit Icon</button>
                                            </div>
                                        </div>
                                       
                                        :
                                        <input
                                            type="file"
                                            accept="image/png"
                                            name="photo"
                                            placeholder="Masukkan Icon Jurusan"
                                            className="form-control bg-light"
                                            required
                                            onChange={(e) => {
                                                const selectedFile = e.target.files[0];
                                                setData({ ...data, photo: selectedFile });}}
                                        />
                                    }
                                </Col>
                            </Row>
                            <Row className="g-2 mt-3">
                                <Col md>
                                    <input
                                        type="text"
                                        name="id"
                                        disabled
                                        hidden
                                        defaultValue={data.id}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md>
                                    <div className="float-end mt-2">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button onClick={onHide} type="button" className="btn-table rounded-pill" variant="danger">Batal</Button>
                                            <Button type="submit" variant="sucess" className="btn-table rounded-pill custom-button" >
                                                {editdata ? <span>Edit Data</span> : <span>Tambahkan</span>}
                                            </Button>
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