import { Modal, Button, Row, Col } from "react-bootstrap";

export default function ModalDetailBuku({ show, onHide, data }) {
    return (
        <>
            <Modal show={show} onHide={onHide} keyboard={false} centered size='lg'>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Row>
                        <Col lg="3">
                            <img src={data?.cover} alt={data?.judul} width="155px"/>
                        </Col>
                        <Col lg="9">
                            <Row>
                                <Col>
                                    <h4>{data?.judul}</h4>
                                </Col>
                                <Col lg="3">
                                    <Button>Pinjam</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Row>
                                    <Col>ISBN</Col>
                                    <Col>{data?.isbn}</Col>
                                </Row>
                                <Row>
                                    <Col>Penulis</Col>
                                    <Col>{data?.penulis}</Col>
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
