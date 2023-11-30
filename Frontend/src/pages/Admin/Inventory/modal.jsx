import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editInventory, postInventory } from "../../../store/inventory/actions";
import "../../../assets/styles/common.css";

export default function ModalInventory({ show, onHide, editdata }) {
    const dispatch = useDispatch()
    const [cover, setCover] = useState(false)
    const dataJurusan = useSelector((state) => state.major.response)
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

    const handleClick = () => {
        setCover(true)
    }

    useEffect(() => {
        if (editdata) {
            setData({
                judul: editdata.judul || '',
                file: editdata.cover || '',
                isbn: editdata.isbn || '',
                penerbit: editdata.penerbit || '',
                penulis: editdata.penulis || '',
                tahunTerbit: editdata.tahun_terbit || '',
                halaman: editdata.jumlah_halaman || '',
                stok: editdata.stok_buku || '',
                sinopsis: editdata.sinopsis || '',
                jurusan: editdata.jurusan || '',
            });
        }
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
            });
            setCover(false)
        }
    }, [show])
    return (
        <>
            <Modal show={show} onHide={onHide} centered size='lg' className="custom-modal">
                {/* <Modal.Header closeButton /> */}
                <Modal.Body style={{ backgroundColor: '#e0f8f2', borderRadius: '25px',}} className="custom-modal-body pb-5">
                    <Container>
                        <Row>
                            <Col>
                                {editdata? <h4>Edit Data</h4> : <h4>Tambah Data</h4>}
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
                            // console.log(Object.fromEntries(formData))
                            editdata ?
                                dispatch(editInventory(data.isbn, formData, onHide))
                                :
                                dispatch(postInventory(formData, onHide));
                            setCover(false)
                        }}>
                            <Row className="g-2">
                                <Col md>
                                    <label>Judul</label>
                                    <input
                                        type="text"
                                        name="judul"
                                        placeholder="Masukkan Judul Buku"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.judul}
                                        required
                                        onChange={(e) => setData({...data, judul: e.target.value})}
                                    />
                                </Col>
                                <Col md>
                                    <label>Penulis</label>
                                    <input type="text"
                                        className="form-control bg-light"
                                        placeholder="Masukkan Penulis Buku "
                                        name='penulis'
                                        defaultValue={data.penulis}
                                        required
                                        onChange={(e) => setData({...data, penulis: e.target.value})}
                                    />
                                </Col>
                                
                            </Row>
                            <Row className="g-2 mt-3">
                                <Col md>
                                    <label>ISBN</label>
                                    <input
                                        type="text"
                                        name="isbn"
                                        placeholder="Masukkan ISBN Buku"
                                        className="form-control bg-light mb-4"
                                        disabled={editdata}
                                        defaultValue={data.isbn}
                                        onChange={(e) => setData({...data, isbn: e.target.value})}
                                    />
                                </Col>
                                <Col md>
                                    <label>Jumlah Halaman</label>
                                    <input
                                        type="number"
                                        name="halaman"
                                        placeholder="Masukkan Jumlah Halaman"
                                        className="form-control bg-light"
                                        defaultValue={data.halaman}
                                        required
                                        onChange={(e) => setData({...data, halaman: e.target.value})}
                                    />
                                </Col>
                                
                            </Row>
                            <Row className="g-2 mt-3">
                                <Col md>
                                    <label>Penerbit</label>
                                    <input
                                        type="text"
                                        name="penerbit"
                                        placeholder="Masukkan Penerbit Buku"
                                        className="form-control bg-light mb-4"
                                        defaultValue={data.penerbit}
                                        required
                                        onChange={(e) => setData({...data, penerbit: e.target.value})}
                                    />
                                </Col>
                                <Col md>
                                    <label>Stok Buku</label>
                                    <input
                                        type="number"
                                        name="stok"
                                        placeholder="Masukkan Stok Buku"
                                        className="form-control bg-light"
                                        defaultValue={data.stok}
                                        required
                                        onChange={(e) => setData({...data, stok: e.target.value})}
                                    />
                                </Col>
                                
                            </Row>
                            <Row className="g-2 mt-3">
                                <Col md>
                                    <label>Tahun Terbit</label>
                                    <input
                                        type="number"
                                        className="form-control bg-light mb-4"
                                        name="tahunTerbit"
                                        placeholder="Masukkan Tahun Terbit"
                                        defaultValue={data.tahunTerbit}
                                        required
                                        onChange={(e) => {
                                            const year = e.target.value.slice(0, 4);
                                            setData({ ...data, tahunTerbit: year });}}
                                    />
                                </Col>
                                <Col md>
                                    <label>Jurusan</label>
                                    <select
                                        className="form-control bg-light"
                                        name="jurusan"
                                        value={data.jurusan}
                                        onChange={(e) => setData({ ...data, jurusan: e.target.value })}
                                        required={data.jurusan === ""}
                                    >
                                        <option value="">--Pilih Jurusan--</option>
                                        <option value="lainnya">lainnya</option>
                                        {Array.isArray(dataJurusan?.data?.jurusan) &&
                                            dataJurusan?.data?.jurusan.map((item) => (
                                                <option key={item.id} value={item.name}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </Col>
                            </Row>
                            <Row className="g-2 mt-3">
                                <Col md>
                                    <label>Sinopsis</label>
                                    <textarea
                                        rows="5"
                                        
                                        className="bg-light responsive-textarea"
                                        placeholder="Masukkan Sinopsis Buku"
                                        name='sinopsis'
                                        defaultValue={data.sinopsis}
                                        required
                                        onChange={(e) => setData({...data, sinopsis: e.target.value})}
                                    ></textarea>
                                </Col>
                                <Col md>
                                    <label>Cover Buku</label>
                                    {editdata ? 
                                        !cover ?
                                            <div>
                                                <img src={data.file} alt={data.judul} style={{borderRadius:'12px', width:'100px'}} />
                                                <button onClick={handleClick}  className=" ms-5 rounded-pill ">Edit Cover</button>
                                            </div>
                                            :
                                            <input
                                                type="file"
                                                accept="image/png"
                                                name="file"
                                                placeholder="Masukkan Cover Buku"
                                                className="form-control bg-light"
                                                required
                                                onChange={(e) => {
                                                    const selectedFile = e.target.files[0];
                                                    setData({ ...data, file: selectedFile });}}
                                            />
                                        :
                                        <input
                                            type="file"
                                            accept="image/png"
                                            name="file"
                                            placeholder="Masukkan Cover Buku"
                                            className="form-control bg-light"
                                            required
                                            onChange={(e) => {
                                                const selectedFile = e.target.files[0];
                                                setData({ ...data, file: selectedFile });}}
                                        />
                                    }
                                </Col>
                                {editdata? <span className="fs-6 text-body-secondary text-capitalize">
                                                    Keterangan: <br/>
                                                    Tidak Dapat Mengubah ISBN, Silahkan Hapus Data dan Tambahkan buku Kembali
                                </span> : null}
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