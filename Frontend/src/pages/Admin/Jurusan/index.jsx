import { Card, Col, Row, Container, CardBody, Alert, Button } from "react-bootstrap";
import "../../../assets/styles/common.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import { clearJurusanMessage, deleteJurusan, jurusan } from "../../../store/actions";
import ModalJurusan from "./modalJurusan";
import Waveup from '../../../components/background/Wavetop';
import Wavebot from '../../../components/background/Wavebot';

export default function Jurusan() {
    const dispatch = useDispatch()
    const dataPinjam = useSelector((state) => state.borrow)
    const dataJurusan = useSelector((state) => state.major.response)
    const messageDelete = useSelector((state) => state.major.delete)
    const messagePost = useSelector((state) => state.major.post)
    const messagePatch = useSelector((state) => state.major.patch)
    useEffect(() => {
        dispatch(jurusan())
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: (_, index) => index + 1
            },
            {
                Header: 'Nama Jurusan',
                accessor: 'name',
                Cell: ({ value }) => (value)
            },
            {
                Header: 'Icon Jurusan',
                accessor: 'photo',
                Cell: ({ value }) => <img src={value} alt='icon' width="50px" />
            },
            {
                Header: 'Aksi',
                id: 'actions',
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className='text-center'>
                        <>
                            <Button
                                variant='success'
                                onClick={() => {
                                    setSelectedBook(row.original)
                                    setShowModal(true);
                                }}
                                className='btn-tbl-detail'
                            >
                                Edit
                            </Button>
                            <Button
                                variant='danger'
                                onClick={() => {
                                    if (confirm("Yakin Ingin Menghapus Jurusan " + row.original.name)) dispatch(deleteJurusan(row.original.id))
                                }}
                                className='btn-tbl-delete'
                            >
                                Hapus
                            </Button>
                        </>
                    </div>
                ),
            },
        ],
        [],
    )
    const data = useMemo(
        () => (dataJurusan?.data?.jurusan || []),
        [dataJurusan?.data?.jurusan]
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
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )
    const { globalFilter } = state
    const handleDismiss = () => {
        dispatch(clearJurusanMessage());
    };

    const [showModal, setShowModal] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null);

    const handleClose = () => {
        setShowModal(false)
    };

    return (
        <Container>
            <Waveup color="#B6D8CF" />
            <Wavebot color="#B6D8CF" />
            <Row>
                <Col className='my-5'>
                    <Card className="overflow-hidden p-4 pt-2 pb-2 border-0 shadow-lg rounded-4">
                        <CardBody>
                            <Row>
                                <Col className='text-center'>
                                    {messageDelete.message ?
                                        <Alert dismissible variant='danger text-capitalize' onClose={handleDismiss}>{messageDelete.message.data.message}</Alert>
                                        :
                                        (messagePost.message || messagePatch.message) ? (
                                            <Alert dismissible variant={messagePost.message ? 'success' : 'info'} onClose={handleDismiss}>
                                                {(messagePost && messagePost?.message?.data?.message) || (messagePatch && messagePatch?.message?.data?.message)}
                                            </Alert>
                                        ) :
                                            null
                                    }
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <p className=" fw-bold">Data Jurusan</p>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <div className="position-relative px-3">
                                        <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data jurusan" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
                                    </div>
                                    <div className="position-relative">
                                        <Button className="btn-table rounded-pill custom-button" variant="success" onClick={() => { setShowModal(true); setSelectedBook(null) }}>Tambah Jurusan</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className="table align-middle table-nowrap table-hover">
                                            <thead className="custom-theader5   text-center">
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
                                                <tbody {...getTableBodyProps()} className="text-center custom-tbody5">
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
            <ModalJurusan show={showModal} onHide={handleClose} editdata={selectedBook} />
        </Container>
    );
}
