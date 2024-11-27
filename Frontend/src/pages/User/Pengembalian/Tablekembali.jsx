import { Card, Col, Row, Container, CardBody, Alert } from "react-bootstrap";
import "../../../assets/styles/common.css";
import StatusBadge from "../../../components/Statusbadge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { clearBorrowMessage } from "../../../store/borrow/actions";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import moment from 'moment'
import { returnUser } from "../../../store/return/actions";

export default function TableKembali() {
    const dispatch = useDispatch()
    const dataPinjam = useSelector((state) => state.borrow)
    const dataKembali = useSelector((state) => state.return)
    const message = useSelector((state) => state.borrow.add.message)

    useEffect(() => {
        dispatch(returnUser())
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'Judul Buku',
                accessor: 'judul',
                Cell: ({ value }) => (value)
            },
            {
                Header: 'Tanggal Pinjam',
                accessor: 'created_at',
                Cell: ({ value }) => moment(value).format('DD-MM-YYYY HH:mm')
            },
            {
                Header: 'Tenggat Pengembalian',
                accessor: 'due_date',
                Cell: ({ value }) => value === '-' ? value : moment(value).format('DD-MM-YYYY HH:mm')
            },
            {
                Header: 'Keterlambatan',
                accessor: 'terlambat',
                Cell: ({ value }) => (value + " Hari")
            },
            {
                Header: 'Denda',
                accessor: 'denda',
                Cell: ({ value }) => (value === null ? "-" : "Rp " + value)
            },
            {
                Header: 'Status',
                accessor: 'pengembalian',
                Cell: ({ value }) => <StatusBadge status={value} />
            }
        ],
        [],
    )
    const data = useMemo(
        () => (dataKembali?.response?.data?.data || []),
        [dataKembali?.response?.data?.data]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        gotoPage,
        pageCount,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 10,
                sortBy: [{ id: 'updated_at', desc: true }],
            },
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    const { globalFilter } = state

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
                                    {message ? <Alert dismissible variant='success text-capitalize' onClose={handleDismiss}>{message?.response?.data?.message || 'Pengajuan Peminjaman Sukses'}</Alert> :
                                        null}
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <p className=" fw-bold">Pengembalian</p>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <div className="mb-2 d-inline-block">
                                        <div className="position-relative">
                                            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data buku" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className="table align-middle table-nowrap table-hover">
                                            <thead className="custom-theader">
                                                {headerGroups.map((headerGroup) => {
                                                    const { key: headerKey, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                                                    return (
                                                        <tr key={headerKey} {...restHeaderGroupProps}>
                                                            {headerGroup.headers.map((column) => {
                                                                const { key: columnKey, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                                                                const sortIcon = column.isSortedDesc ? "🔼" : "🔽";
                                                                return (
                                                                    <th key={columnKey} {...restColumnProps} style={{ backgroundColor: '#f3f6f9' }}>
                                                                        {column.render('Header')}
                                                                        <span>{column.isSorted ? sortIcon : ''}</span>
                                                                    </th>
                                                                );
                                                            })}
                                                        </tr>
                                                    );
                                                })}
                                            </thead>
                                            {page.length === 0 ? (
                                                <tbody>
                                                    <tr key="empty">
                                                        <td key="empty" colSpan={headerGroups[0].headers.length} className="text-center">
                                                            {dataPinjam.loading ? 'Memuat data...' : 'Tidak ada data.'}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody {...getTableBodyProps()} className="text-center custom-tbody3">
                                                    {page.map((row) => {
                                                        prepareRow(row);
                                                        const { key: rowKey, ...restRowProps } = row.getRowProps();
                                                        return (
                                                            <tr key={rowKey} {...restRowProps}>
                                                                {row.cells.map((cell) => {
                                                                    const { key: cellKey, ...restCellProps } = cell.getCellProps();
                                                                    return (
                                                                        <td key={cellKey} {...restCellProps}>
                                                                            {cell.render('Cell')}
                                                                        </td>
                                                                    );
                                                                })}
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
                                        <ul className="pagination pagination-sm justify-content-end mb-2">
                                            {/* First */}
                                            <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(0)} tabIndex="-1">
                                                    {'<<'}
                                                </a>
                                            </li>
                                            {/* Previus */}
                                            <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(state.pageIndex - 1)} tabIndex="-1">{'<'}</a>
                                            </li>
                                            {Array.from({ length: pageCount }, (_, index) => index + 1).map((key, index) => (
                                                <li key={key} className={`page-item ${index === state.pageIndex ? 'active' : ''}`}>
                                                    <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(index)}>{index + 1}</a>
                                                </li>
                                            ))}
                                            {/* Next */}
                                            <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(state.pageIndex + 1)}>{'>'}</a>
                                            </li>
                                            {/* Last */}
                                            <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => gotoPage(pageCount - 1)}>
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
