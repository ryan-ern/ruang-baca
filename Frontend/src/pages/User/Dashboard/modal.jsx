import { Modal, Button, Row, Col } from "react-bootstrap";

export default function ModalDetail({ show, onHide, data }) {
    return (
        <>
            <Modal show={show} onHide={onHide} keyboard={false} centered size='lg'>
                <Modal.Header closeButton />
                <Modal.Body>
                    <Row>
                        <Col lg="3">
                            <img src={data?.cover} alt={data?.judul} />
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
                </Modal.Body>
            </Modal>
        </>
    );
}
