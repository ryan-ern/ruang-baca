import "../../../assets/styles/common.css";
import Cardbuku from "./Cardbuku";
import Waveup from "../../../components/background/Wavetop";
import Breadcrumb from "../../../components/Breadcrumb";
import { Button, Col, Row, Container, Alert, Card, InputGroup, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import IMAGES from "../../../assets/images";
import "../../../assets/styles/dashboard.css";
import Wavebot from "../../../components/background/Wavebot";
import Carouselcard from "./Carouselcard";
import { useDispatch, useSelector } from "react-redux";
import { dashboard, getFined, jurusan, getSearchByJudul, getSearchByJudulReset } from "../../../store/actions";
import ModalDetailBuku from "../../../components/modal";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [query, setQuery] = useState("");
    const [selectedMajor, setSelectedMajor] = useState(null)
    const dataSearch = useSelector((state) => state.search)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getFined())
        dispatch(dashboard());
        dispatch(jurusan())
        const intervalId = setInterval(() => {
            dispatch(dashboard());
        }, 10_000);
        return () => clearInterval(intervalId);
    }, [dispatch])

    const handleSelectedMajorChange = (selectedMajorName) => {
        setSelectedMajor(selectedMajorName)
    };

    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClick = (index) => {
        setSelectedBook(dataSearch.response.data[index]);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setQuery("");
        setSelectedMajor(null)
        dispatch(getSearchByJudulReset())
    };


    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getSearchByJudul(query))
    };
    return (
        <>
            <Waveup color="#B6D8CF" />
            <Wavebot color="#B6D8CF" />
            <div className="py-4">
                <Container>
                    <Row>
                        <Col sm={12} lg={1} className="text-center mb-2">
                            <img
                                src={IMAGES.logo}
                                alt="Logo SMKN 7 Bandar Lampung"
                                width={50}
                            />
                        </Col>
                        <Col sm={12} lg={10} >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <h3 className="text-center">
                                    RUANG BACA <br /> SMK NEGERI 7 BANDAR LAMPUNG
                                </h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <form onSubmit={handleSearch} className="mt-3 mb-3">
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            value={query}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Cari Judul Buku di Sini"
                                        />
                                        {dataSearch.response.data?.length > 0 || dataSearch?.response?.message === "Buku Tidak ditemukan" ? (
                                            <>
                                                <Button onClick={handleReset} variant="danger" className="btn px-3">
                                                    Reset
                                                </Button>
                                                <Button type="submit" className="btnsearch btn-primary">
                                                    Cari
                                                </Button>
                                            </>
                                        ) : (
                                            <Button type="submit" className="btnsearch btn-primary">
                                                Cari
                                            </Button>
                                        )}
                                    </InputGroup>
                                </form>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}

                            >
                                <Button variant="success" className="rounded-pill px-3" style={{ background: '#009688' }} onClick={() => navigate("/panel/daily-present")}>Lakukan Scan Kehadiran</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Breadcrumb title={selectedMajor} pageTitle="Buku Berdasarkan Jurusan" />
                    </Row>
                    <Row>
                        <Carouselcard onSelectedMajorChange={handleSelectedMajorChange} />
                    </Row>
                    {dataSearch.response.length === 0 ?
                        <Row>
                            <p className="mb-0 mt-3">Buku Populer</p>
                            <Cardbuku />
                        </Row>
                        :
                        <div>
                            <p className="mb-0 mt-3">Hasil Pencarian</p>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                {dataSearch.response.data ? (
                                    dataSearch.response.data?.map((book, index) => (
                                        <Card
                                            key={index}
                                            text="black"
                                            className="text-center cardbuku p-0 m-2 me-3 mb-5"
                                            onClick={() => handleClick(index)}
                                            style={{
                                                flex: "1 1 auto",
                                                maxWidth: '120px'
                                            }}
                                        >
                                            <Card.Body className="cardbuku-body">
                                                <Card.Img
                                                    className=""
                                                    src={book.cover}
                                                    style={{
                                                        borderRadius: "6px",
                                                        maxHeight: "120px",
                                                        objectFit: "cover",
                                                        width: "100%",
                                                    }}
                                                />
                                                <Card.Text className="cardbuku-judul">{book.judul}</Card.Text>
                                                <Card.Text className="cardbuku-text-author">
                                                    {book.penulis}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ) : (
                                    <Alert className="mt-2 w-100 text-center" variant="danger">{dataSearch?.response?.message}</Alert>
                                )}
                                <ModalDetailBuku show={showModal} onHide={handleClose} data={selectedBook} />
                            </div>
                        </div>
                    }
                </Container>
            </div>
        </>
    );
}
