import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
    useTable, useSortBy, useGlobalFilter, usePagination,
} from 'react-table';
import { clearIventoryMessage, inventory } from '../../../store/inventory/actions';
import Waveup from '../../../components/background/Wavetop';
import Wavebot from '../../../components/background/Wavebot';
import ModalInventory from './modal';
import ModalDetailBuku from '../../../components/modal';
import Top from './top';
import "../../../assets/styles/common.css";
import ModalKonfirmasi from '../../../components/modalkonfirmasi';
import { jurusan } from '../../../store/actions';

export default function Inventory() {
    const dispatch = useDispatch()
    const inv = useSelector((state) => state.inventory)
    const editMessage = useSelector((state) => state.inventory.edit.message)
    const createMessage = useSelector((state) => state.inventory.create.message)
    const deleteMessage = useSelector((state) => state.inventory.delete.message)

    useEffect(() => {
        dispatch(inventory())
        dispatch(jurusan())
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: (_, index) => index + 1
            },
            {
                Header: 'Judul Buku',
                accessor: 'judul',
                Cell: ({ value }) => (value)
            },
            {
                Header: 'ISBN',
                accessor: 'isbn',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Penerbit',
                accessor: 'penerbit',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Tahun Terbit',
                accessor: 'tahun_terbit',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Stok',
                accessor: 'stok_buku',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Aksi',
                id: 'actions',
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className='text-center'>
                        <Button
                            variant='success'
                            onClick={() => {
                                setSelectedBook(row.original);
                                setShowModalDetail(true);
                            }}
                            className='btn-tbl-detail'
                        >Detail</Button>
                        <Button
                            variant='warning'
                            onClick={() => {
                                setSelectedBook(row.original);
                                setShowModal(true);
                            }}
                            className='btn-tbl-edit'
                        >Edit</Button>
                        <Button
                            variant='danger'
                            onClick={() => {
                                setSelectedBook(row.original.isbn);
                                setShowModalDelete(true);

                            }}
                            className='btn-tbl-delete'
                        >Delete</Button>
                        {/* <Button
                            variant='danger'
                            onClick={() => {
                                if(confirm("Yakin Ingin Menghapus Data Buku Dengan ISBN : "+row.original.isbn))dispatch(deleteInventory(row.original.isbn))
                            }}
                            className='btn-tbl-delete'
                        >Delete</Button> */}
                    </div>
                ),
            },
        ],
        [],
    )

    const data = useMemo(
        () => (inv.response?.data || []),
        [inv.response.data],
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

    const [showModal, setShowModal] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleClose = () => {
        setShowModal(false)
        setShowModalDetail(false)
        setShowModalDelete(false)
    };

    const handleDismiss = () => {
        dispatch(clearIventoryMessage());
    };

    return (
        <Container>
            <Waveup color="#B6D8CF" />
            <Wavebot color="#B6D8CF" />
            <Row>
                <Col className='my-5'>
                    <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4">
                        <CardBody>
                            <Row>
                                <Col className='text-center'>
                                    {deleteMessage ? <Alert dismissible onClose={handleDismiss} variant='danger'>{deleteMessage.message}</Alert> :
                                        (editMessage || createMessage) ? (
                                            <Alert dismissible onClose={handleDismiss} variant={createMessage ? 'success' : 'info'}>
                                                {`${(editMessage && editMessage.message) || (createMessage && createMessage.message)} Dengan ISBN : ${((editMessage && editMessage.data && editMessage.data.isbn) || (createMessage && createMessage.data && createMessage.data.isbn))}`}
                                            </Alert>
                                        ) : null}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col >
                                    <div className="mb-2 d-inline-block">
                                        <div className="position-relative">
                                            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data buku" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
                                        </div>
                                    </div>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Top />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className="table align-middle table-nowrap table-hover">
                                            <thead className="custom-theader3">
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
                                                            {inv.loading ? 'Memuat data...' : 'Tidak ada data.'}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody {...getTableBodyProps()} className="text-center custom-tbody4">
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
            <ModalInventory show={showModal} onHide={handleClose} editdata={selectedBook} />
            <ModalDetailBuku show={showModalDetail} onHide={handleClose} data={selectedBook} inv={true} />
            <ModalKonfirmasi show={showModalDelete} onHide={handleClose} data={selectedBook} event="inventory" />
        </Container>
    )
}