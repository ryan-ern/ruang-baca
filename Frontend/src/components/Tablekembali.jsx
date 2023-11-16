// import {
//   AccordionsCode,
//   AccordionsHeader,
// } from "../../BaseUi/UiAccordions/Accordion";

import { Table, Card, Col, Row, Container } from "react-bootstrap";
import "../assets/styles/common.css";
import StatusBadge from "./Statusbadge";

import Pagination from "react-bootstrap/Pagination";
// import { DefaultTables } from "./BasicTableCode";

export default function TableKembali() {
    return (
        <div className="my-0 pt-sm-4">
            <Container>
                <Row className="justify-content-center">
                    <Col xxl={12}>
                        <Card className="overflow-hidden p-4 pt-2 pb-2 border-0 shadow-lg rounded-4">
                            <Card.Header className="bg-white border-0 mb-2">
                                <Row>
                                    <Col> Daftar Pengembalian</Col>
                                    <Col className="d-flex justify-content-end">
                                        <input
                                            type="search"
                                            className="rounded-pill"
                                            placeholder="cari disini"
                                        />
                                    </Col>
                                </Row>
                            </Card.Header>

                            <Card.Body className="p-sm-2">
                                <div className="table-responsive">
                                    <Table
                                        borderless="true"
                                        className="table align-middle table-nowrap mb-0"
                                    >
                                        <thead className="custom-theader2">
                                            <tr>
                                                <th scope="col" className="text-center align-middle">
                          Judul Buku
                                                </th>
                                                <th scope="col">Tanggal Peminjaman</th>
                                                <th scope="col">Tanggal Pengembalian</th>
                                                <th scope="col" className="align-middle">
                          Keterlambatan
                                                </th>
                                                <th scope="col" className="align-middle">
                          Denda
                                                </th>
                                                <th scope="col">Status Pengembalian</th>
                                            </tr>
                                        </thead>
                                        <tbody className="custom-tbody">
                                            <tr>
                                                <th scope="row">Loneliness is my Best Friend</th>
                                                <td>October 15, 2021</td>
                                                <td>October 15, 2021</td>
                                                <td>5 Hari</td>
                                                <td>Rp2000</td>
                                                <td className="text-center">
                                                    <StatusBadge status="rejected-b" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Self Healing</th>
                                                <td>October 15, 2021</td>
                                                <td>October 7, 2021</td>
                                                <td>5 Hari</td>
                                                <td>Rp2000</td>
                                                <td className="text-center">
                                                    <StatusBadge status="approved" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Overthinking</th>
                                                <td>October 15, 2021</td>
                                                <td>October 5, 2021</td>
                                                <td>5 Hari</td>
                                                <td>Rp2000</td>
                                                <td className="text-center">
                                                    <StatusBadge status="approved" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-end pb-0 bg-white border-0">
                                <Pagination size="sm">
                                    <Pagination.Prev />
                                    <Pagination.Item>{"1 of 3"}</Pagination.Item>
                                    <Pagination.Next />
                                </Pagination>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
