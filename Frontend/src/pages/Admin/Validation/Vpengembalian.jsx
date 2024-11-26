import { useEffect, useMemo, } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
    useTable, useSortBy, useGlobalFilter, usePagination,
} from 'react-table';
import Waveup from '../../../components/background/Wavetop';
import Wavebot from '../../../components/background/Wavebot';
// import { account } from '../../../store/account/actions';
// import ModalEditAccount from '../Account/modal';
import moment from 'moment';
import { downloadReturn, postAcceptReturn, postResetReturn, returnAdmin } from '../../../store/actions';
import StatusBadge from '../../../components/Statusbadge';
import DateRangePicker from 'react-bootstrap-daterangepicker';

export default function Vpengembalian() {
    const dispatch = useDispatch()
    const Pengembalian = useSelector((state) => state.return)

    // const editMessage = useSelector((state) => state.account.edit.message)
    // const deleteMessage = useSelector((state) => state.account.delete.message)
    const downloadMessage = useSelector((state) => state.return.download.message)
    const columns = useMemo(
        () => [

            {
                Header: 'Nama',
                accessor: 'name',
                Cell: ({ value }) => (value)
            },
            {
                Header: 'Judul Buku',
                accessor: 'judul',
                Cell: ({ value }) => (value),
            },
            {
                Header: 'Tanggal Peminjaman',
                accessor: 'created_at',
                Cell: ({ value }) => moment(value).format('DD-MM-YYYY HH:mm')
            },
            {
                Header: 'Tenggat Pengembalian',
                accessor: 'due_date',
                Cell: ({ value }) => value === '-' ? value : moment(value).format('DD-MM-YYYY HH:mm')
            },
            {
                Header: 'Telat',
                accessor: 'terlambat',
                Cell: ({ value }) => (value + " Hari")
            },
            {
                Header: 'Denda',
                accessor: 'denda',
                Cell: ({ value }) => (value)
            },
            {
                Header: 'status',
                accessor: 'pengembalian',
                Cell: ({ value }) => <StatusBadge status={value} />,
            },
            {
                Header: 'Aksi',
                id: 'actions',
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className='text-center'>
                        {row.original.pengembalian === '-' ? (
                            <Button
                                variant='success'
                                onClick={() => {
                                    dispatch(postAcceptReturn(row.original.id))
                                }}
                                className='btn-tbl-detail'
                            >
                                Terima
                            </Button>
                        ) : (

                            <Button
                                variant='dark'
                                onClick={() => {
                                    if (confirm("Yakin Ingin Reset Status " + row.original.name + " Dengan Judul " + row.original.judul)) dispatch(postResetReturn(row.original.id))
                                }}
                                className='btn-tbl-info'
                            >
                                Reset
                            </Button>
                        )}
                    </div>
                ),
            },
        ],
        [],
    )

    const data = useMemo(
        () => (Pengembalian?.response?.data?.data || []),
        [Pengembalian?.response?.data?.data],
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
                sortBy: [
                    { id: 'pengembalian', desc: false },
                    { id: 'due_date', desc: false },
                ],
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    const { globalFilter } = state

    // const [showModal, setShowModal] = useState(false);
    // const [selectedBook, setSelectedBook] = useState(null);



    // const handleClose = () => {
    //     setShowModal(false)
    // };

    useEffect(() => {
        dispatch(returnAdmin())
    }, [])

    const handleDownload = (event, picker) => {
        if (picker.startDate && picker.endDate) {
            const startDate = picker.startDate.format('YYYY-MM-DD');
            const endDate = picker.endDate.format('YYYY-MM-DD');
            dispatch(downloadReturn(startDate, endDate));
        } else {
            console.error('Date range is not properly selected');
        }
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
                                    {(downloadMessage) ?
                                        <Alert variant={'danger'} dismissible>{downloadMessage} </Alert> : null
                                    }
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <b>Validasi Pengembalian</b>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <div className="position-relative mx-3">
                                        <DateRangePicker onApply={handleDownload} initialSettings={{ showDropdowns: true }}>
                                            <button className="btn-table rounded-pill custom-button">Download</button>
                                        </DateRangePicker>
                                    </div>
                                    <div className="mb-2 d-inline-block">
                                        <div className="position-relative">
                                            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari NISN atau Judul" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className="table align-middle table-nowrap table-hover">
                                            <thead className="custom-theader6">
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
                                                            {Pengembalian.loading ? 'Memuat data...' : 'Tidak ada data.'}
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
            {/* <ModalEditAccount show={showModal} onHide={handleClose} editdata={selectedBook} /> */}
        </Container>
    )
}