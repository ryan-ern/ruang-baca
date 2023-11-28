import { Card, Col, Row, Container, CardBody, Alert, Button } from "react-bootstrap";
import "../../../assets/styles/common.css";
import StatusBadge from "../../../components/Statusbadge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { borrow, clearBorrowMessage } from "../../../store/borrow/actions";
import { usePagination, useTable } from "react-table";
import moment from 'moment'

export default function TablePeminjaman() {
    const dispatch = useDispatch()
    const dataPinjam = useSelector((state) => state.borrow)
    const message = useSelector((state) => state.borrow.add.message)

    useEffect(() => {
        dispatch(borrow())
    },[])

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: (_,index) => index+1
            },
            {
                Header: 'Judul Buku',
                accessor: 'judul',
                Cell: ({value}) => (value)
            },
            {
                Header: 'Tanggal Pinjam',
                accessor: 'created_at',
                Cell: ({value}) => moment(value).format('DD-MM-YYYY HH:mm')
            },
            {
                Header: 'Tenggat Pengembalian',
                accessor: 'due_date',
                Cell: ({value}) => value === '-' ? value : moment(value).format('DD-MM-YYYY HH:mm')
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({value}) => <StatusBadge status={value} />
            }
        ],
        [],
    )
    const data = useMemo(
        () => (dataPinjam.response?.data || []),
        [dataPinjam.response.data]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        usePagination,
    )
    
    const handleDismiss = () => {
        dispatch(clearBorrowMessage());
    };

    return (
        <Container>
            <Row>
                <Col className='my-5'>
                    <Card className="overflow-hidden p-4 pt-2 pb-2 border-0 shadow-lg rounded-4">
                        <CardBody>
                            <Row>
                                <Col className='text-center'>
                                    {message ? <Alert dismissible variant='success text-capitalize' onClose={handleDismiss}>{message.message}</Alert> :
                                        null}
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <p className=" fw-bold">Peminjaman</p>
                                </Col>
                                <Col>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="success" className=" btn-table rounded-pill custom-button">Pengembalian</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className='table align-middle table-nowrap table-hover'>
                                            <thead className='custom-theader align-middle'>
                                                {headerGroups.map((headerGroup) => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map((column, index) => {
                                                            return (
                                                                <th style={{backgroundColor:'#f3f6f9'}} key={index}>
                                                                    {column.render('Header')}
                                                                </th>
                                                            );
                                                        })}
                                                    </tr>
                                                ))}
                                            </thead>
                                            {page.length === 0 ? (
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={headerGroups[0].headers.length} className="text-center">
                                                            {(dataPinjam.loading) ? 'Memuat data...' : 'Tidak ada data.'}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody {...getTableBodyProps()} className='text-center custom-tbody3'>
                                                    {page.map((row) => {
                                                        prepareRow(row);
                                                        return (
                                                            <tr {...row.getRowProps()}>
                                                                {row.cells.map((cell) => (
                                                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                                ))}
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
