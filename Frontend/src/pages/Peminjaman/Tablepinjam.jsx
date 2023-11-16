// import {
//   AccordionsCode,
//   AccordionsHeader,
// } from "../../BaseUi/UiAccordions/Accordion";
import React from "react";
import { Table, Button, Card, Col, Row, Container } from "react-bootstrap";
import "../assets/styles/common.css";
import StatusBadge from "../../components/Statusbadge";
import { Link } from "react-router-dom";
// import { DefaultTables } from "./BasicTableCode";

export default function TablePeminjaman() {
    const statuspinjam = "pending";
    const statuspinjam2 = "approved";
    const statuspinjam3 = "rejected";
    return (
        <div className="my-0 pt-sm-4">
            <Container>
                <Row className="justify-content-center">
                    <Col xxl={12}>
                        <Card className="overflow-hidden p-4 pt-2 border-0 shadow-lg rounded-4">
                            <Card.Header className="bg-white border-0 mb-2">
                                <Row>
                                    <Col> Daftar Peminjaman</Col>
                                    <Col className="d-flex justify-content-end">
                                        <Button
                                            className="btn-table custom-button rounded-pill"
                                            type="submit"
                                            variant="success"
                                        >
                      Pengembalian
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Header>

                            <Card.Body className="p-sm-2">
                                <div className="table-responsive">
                                    <Table
                                        borderless="true"
                                        className="table align-middle table-nowrap mb-0"
                                    >
                                        <thead className="custom-theader">
                                            <tr>
                                                <th scope="col">Judul Buku</th>
                                                <th scope="col">Tanggal Peminjaman</th>
                                                <th scope="col">Tanggal Pengembalian</th>
                                                <th scope="col">Status Peminjaman</th>
                                            </tr>
                                        </thead>
                                        <tbody className="custom-tbody">
                                            <tr>
                                                <th scope="row">Loneliness is my Best Friend</th>
                                                <td>October 15, 2021</td>
                                                <td>October 15, 2021</td>
                                                <td className="text-center">
                                                    <StatusBadge status={statuspinjam} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Self Healing</th>
                                                <td>October 15, 2021</td>
                                                <td>October 7, 2021</td>
                                                <td className="text-center">
                                                    <StatusBadge status={statuspinjam2} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Overthinking</th>
                                                <td>October 15, 2021</td>
                                                <td>October 5, 2021</td>
                                                <td className="text-center">
                                                    <StatusBadge status={statuspinjam3} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
