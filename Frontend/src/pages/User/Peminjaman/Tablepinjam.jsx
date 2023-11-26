import { Card, Col, Row, Container, CardBody, Alert } from "react-bootstrap";
import "../../../assets/styles/common.css";
import StatusBadge from "../../../components/Statusbadge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { borrow } from "../../../store/borrow/actions";
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
                Cell: ({value}) => value === '-' ? value : moment(value).format('DD-MM-YYYY')
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
    
    
    return (
        <Container>
            <Row>
                <Col className='my-5'>
                    <Card className="bg-card">
                        <CardBody>
                            <Row>
                                <Col className='text-center'>
                                    {message ? <Alert dismissible variant='success text-capitalize' className="">{message.message}</Alert> :
                                        null}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                              
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className='table align-middle table-nowrap table-hover'>
                                            <thead className='text-center'>
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
                                                <tbody {...getTableBodyProps()} className='text-start'>
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
