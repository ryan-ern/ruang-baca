import { Card, Col, Row, Container, CardBody } from "react-bootstrap";
import "../../../assets/styles/common.css";
// import StatusBadge from "../../../components/Statusbadge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { borrow } from "../../../store/borrow/actions";
import { useTable } from "react-table";

export default function TablePeminjaman() {
    const dispatch = useDispatch()
    const dataPinjam = useSelector((state) => state.borrow)

    useEffect(() => {
        dispatch(borrow())
    },[])

    // const statuspinjam = "pending";
    // const statuspinjam2 = "approved";
    // const statuspinjam3 = "rejected";

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
                Header: 'Judul Buku',
                accessor: 'judul',
                Cell: ({value}) => (value)
            },
            {
                Header: 'Tanggal Pinjam',
                accessor: 'judul',
                Cell: ({value}) => (value)
            },
            {
                Header: 'Tenggat Pengembalian',
                accessor: 'judul',
                Cell: ({value}) => (value)
            },
            {
                Header: 'Status',
                accessor: 'judul',
                Cell: ({value}) => (value)
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
        state,
        gotoPage,
        pageCount,
    } = useTable(
        {
            columns,
            data,
        },
    )
    
    return (
        <Container>
            <Row>
                <Col className='my-5'>
                    <Card className="bg-card">
                        <CardBody>
                            <Row>
                                <Col className='text-center'>
                                    {/* {deleteMessage ? <Alert dismissible variant='danger'>{deleteMessage.message}</Alert> :
                                        (editMessage || createMessage) ? (
                                            <Alert dismissible variant={createMessage ? 'success' : 'info'}>
                                                {`${(editMessage && editMessage.message) || (createMessage && createMessage.message)} Dengan ISBN : ${((editMessage && editMessage.data && editMessage.data.isbn) || (createMessage && createMessage.data && createMessage.data.isbn))}`}
                                            </Alert>
                                        ) : null} */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className='table align-middle table-nowrap table-hover'>
                                            <thead className='text-center'>
                                                {headerGroups.map((headerGroup) => (
                                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                                        {headerGroup.headers.map((column) => {
                                                            const sortIcon = column.isSortedDesc ? "🔼": "🔽";
                                                            return (
                                                                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{backgroundColor:'#f3f6f9'}}>
                                                                    {column.render('Header')}
                                                                    <span>{column.isSorted ? sortIcon : ''}</span>
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
                            <Row className="align-items-md-center mt-3">
                                <Col>
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination pagination-rounded justify-content-end mb-2">
                                            {/* First */}
                                            <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" onClick={() => gotoPage(0)} tabIndex="-1">
                                                    {'<<'}
                                                </a>
                                            </li>
                                            {/* Previus */}
                                            <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" onClick={() => gotoPage(state.pageIndex - 1)} tabIndex="-1">{'<'}</a>
                                            </li>
                                            {Array.from({ length: pageCount }, (_, index) => index + 1).map((key, index) => (
                                                <li key={key} className={`page-item ${index === state.pageIndex ? 'active' : ''}`}>
                                                    <a className="page-link" onClick={() => gotoPage(index)}>{index + 1}</a>
                                                </li>
                                            ))}
                                            {/* Next */}
                                            <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" onClick={() => gotoPage(state.pageIndex + 1)}>{'>'}</a>
                                            </li>
                                            {/* Last */}
                                            <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" onClick={() => gotoPage(pageCount - 1)}>
                                                    {">>"}
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
