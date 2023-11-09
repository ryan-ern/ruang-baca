import Cardjurusan from "./Cardjurusan";
import Waveup from "../../components/background/Wavetop";
import Breadcrumb from "../../components/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Col } from "react-bootstrap";
import { useState } from "react";

export default function Dashboard  () {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        // Lakukan aksi pencarian sesuai dengan query
        console.log("Mencari:", query);
    };
    return (
        <>
            <Waveup color="#B6D8CF" />
            <div className="py-4">
                <Container className="">
                    <Row>
                        <Col xs={1}>logo</Col>
                        <Col>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <h5
                                    className="fs-3xl text-center"
                                >
                  RUANG BACA <br /> SMK NEGERI 7 BANDAR LAMPUNG
                                </h5>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}></Col>
                        <Col>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <form onSubmit={handleSearch} className="mt-3 mb-3">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={query}
                                            onChange={handleInputChange}
                                            placeholder="cari disini"
                                        />
                                        <span className="input-group-addon">
                                            <Button type="submit" class="btn btn-primary">
                        cari
                                            </Button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Breadcrumb title="" pageTitle="Buku Berdasarkan Jurusan" />
                    </Row>
                    <Row>
                        <Cardjurusan title={"Multimedia"} image={"../../buku1.jpeg"} />
                        <Cardjurusan
                            title={"Rekayasa Perangkat Lunak"}
                            image={"../../buku1.jpeg"}
                        />
                        <Cardjurusan
                            title={"Rekayasa Perangkat Lunak"}
                            image={"../../buku1.jpeg"}
                        />
                    </Row>
                </Container>
            </div>
        </>
    );
}