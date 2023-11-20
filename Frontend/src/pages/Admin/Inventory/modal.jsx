import { useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { inventory, postInventory } from "../../../store/inventory/actions";

export default function ModalInventory({ show, onHide }) {
    const dispatch = useDispatch()
    const create = useSelector((state) => state.inventory.create)

    const [data, setData] = useState({
        judul: '',
        file: '',
        isbn: '',
        penerbit: '',
        penulis: '',
        tahunTerbit: '',
        halaman: '',
        stok: '',
        sinopsis: '',
        jurusan: '',
        
    })

    useEffect(() => {
        if (!show) {
            setData({
                judul: '',
                file: '',
                isbn: '',
                penerbit: '',
                penulis: '',
                tahunTerbit: '',
                halaman: '',
                stok: '',
                sinopsis: '',
                jurusan: '',
            })
        }
        dispatch(inventory())
    }, [show])
    return (
        <>
            <Modal show={show} onHide={onHide} centered size='lg'>
                {/* <Modal.Header closeButton /> */}
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <h4>Tambah Data</h4>
                            </Col>
                        </Row>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append('judul', data.judul);
                            formData.append('file', data.file);
                            formData.append('isbn', data.isbn);
                            formData.append('penulis', data.penulis);
                            formData.append('penerbit', data.penerbit);
                            formData.append('tahunTerbit', data.tahunTerbit);
                            formData.append('halaman', data.halaman);
                            formData.append('stok', data.stok);
                            formData.append('sinopsis', data.sinopsis);
                            formData.append('jurusan', data.jurusan);
                            dispatch(postInventory(formData, onHide));
                        }}>
                            <Row>
                                <Col>
                                    <label>Judul</label>
                                    <input
                                        type="text"
                                        name="judul"
                                        placeholder="Masukkan Judul Buku"
                                        className="form-control bg-light"
                                        value={data.judul}
                                        onChange={(e) => setData({...data, judul: e.target.value})}
                                    />
                                </Col>
                                <Col>
                                    <label>Penulis</label>
                                    <input type="text"
                                        className="form-control bg-light"
                                        placeholder="Masukkan Penulis Buku "
                                        name='penulis'
                                        value={data.penulis}
                                        onChange={(e) => setData({...data, penulis: e.target.value})}
                                    />
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                    <label>ISBN</label>
                                    <input
                                        type="text"
                                        name="isbn"
                                        placeholder="Masukkan ISBN Buku"
                                        className="form-control bg-light"
                                        value={data.isbn}
                                        onChange={(e) => setData({...data, isbn: e.target.value})}
                                    />
                                </Col>
                                <Col>
                                    <label>Jumlah Halaman</label>
                                    <input
                                        type="number"
                                        name="halaman"
                                        placeholder="Masukkan Jumlah Halaman"
                                        className="form-control bg-light"
                                        value={data.halaman}
                                        onChange={(e) => setData({...data, halaman: e.target.value})}
                                    />
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                    <label>Penerbit</label>
                                    <input
                                        type="text"
                                        name="penerbit"
                                        placeholder="Masukkan Penerbit Buku"
                                        className="form-control bg-light"
                                        value={data.penerbit}
                                        onChange={(e) => setData({...data, penerbit: e.target.value})}
                                    />
                                </Col>
                                <Col>
                                    <label>Stok Buku</label>
                                    <input
                                        type="number"
                                        name="stok"
                                        placeholder="Masukkan Stok Buku"
                                        className="form-control bg-light"
                                        value={data.stok}
                                        onChange={(e) => setData({...data, stok: e.target.value})}
                                    />
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col>
                                    <label>Tahun Terbit</label>
                                    <input
                                        type="number"
                                        className="form-control bg-light"
                                        name="tahunTerbit"
                                        value={data.tahunTerbit}
                                        onChange={(e) => {
                                            const year = e.target.value.slice(0, 4);
                                            setData({ ...data, tahunTerbit: year });}}
                                    />
                                </Col>
                                <Col>
                                    <label>Jurusan</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light"
                                        name="jurusan"
                                        value={data.jurusan}
                                        onChange={(e) => setData({...data, jurusan: e.target.value})}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label>Sinopsis</label>
                                    <textarea
                                        rows="5"
                                        cols="40"
                                        className="bg-light"
                                        placeholder="Masukkan Sinopsis Buku"
                                        name='sinopsis'
                                        value={data.sinopsis}
                                        onChange={(e) => setData({...data, sinopsis: e.target.value})}
                                    ></textarea>
                                </Col>
                                <Col>
                                    <label>Cover Buku</label>
                                    <input
                                        type="file"
                                        accept="image/png"
                                        name="file"
                                        placeholder="Masukkan Cover Buku"
                                        className="form-control bg-light"
                                        onChange={(e) => {
                                            const selectedFile = e.target.files[0];
                                            setData({ ...data, file: selectedFile });}}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="float-end mt-2">
                                        <div className="d-flex flex-wrap gap-2">
                                            <button onClick={onHide} type="button" className="btn btn-danger">Batal</button>
                                            <button disabled={create.loading} type="submit" className="btn btn-success">
                                                <span>Tambahkan</span>
                                                {(create.loading) ? '...' : null}
                                            </button>
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