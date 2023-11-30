import {  useEffect, useMemo, } from 'react'
import {  Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import {
    useTable, useSortBy, useGlobalFilter, usePagination,
} from 'react-table';
import Waveup from '../../../components/background/Wavetop';
import Wavebot from '../../../components/background/Wavebot';
// import { account } from '../../../store/account/actions';
// import ModalEditAccount from '../Account/modal';
import moment from 'moment';
import { returnAdmin } from '../../../store/actions';
import StatusBadge from '../../../components/Statusbadge';

export default function Vpengembalian() {
    const dispatch = useDispatch()
    const Pengembalian = useSelector((state) => state.return)
    
    // const editMessage = useSelector((state) => state.account.edit.message)
    // const deleteMessage = useSelector((state) => state.account.delete.message)
    const columns = useMemo(
        () => [
           
            {
                Header: 'Nama',
                accessor: 'name',
                Cell: ({value}) => (value)
            },
            {
                Header: 'Judul Buku',
                accessor: 'judul',
                Cell: ({value}) => (value),
            },
            {
                Header: 'Tanggal Peminjaman',
                accessor: 'created_at',
                Cell: ({value}) => moment(value).format('DD-MM-YYYY HH:mm')
            },
            {
                Header: 'Tenggat Pengembalian',
                accessor: 'due_date',
                Cell: ({value}) => value === '-' ? value : moment(value).format('DD-MM-YYYY')
            },
            {
                Header: 'Denda',
                accessor: 'denda',
                Cell: ({value}) => (value)
            },
            {
                Header: 'status',
                accessor: 'status',
                Cell: ({value}) => <StatusBadge status={value} />,
            },
            {
                Header: 'Aksi',
                id: 'actions',
                disableSortBy: true,
                Cell: ({row}) => (
                    <div className='text-center'>
                        {row.original.status !== '-' ? (
                            <Button
                                variant='dark'
                                onClick={() => {
                                    // dispatch(deleteBorrow(row.original.id))
                                }}
                                className='btn-tbl-info'
                            >
                                Reset
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant='success'
                                    onClick={() => {
                                        // dispatch(postAcceptBorrow(row.original.id))
                                    }}
                                    className='btn-tbl-detail'
                                >
                                        Terima
                                </Button>
                                <Button
                                    variant='danger'
                                    onClick={() => {
                                        // if (confirm("Yakin Ingin Menolak Peminjaman " + row.original.name + " Dengan Judul " + row.original.judul)) dispatch(postDeniedBorrow(row.original.id))
                                    }}
                                    className='btn-tbl-delete'
                                >
                                        Tolak
                                </Button>
                            </>
                        )}
                    </div>
                ),
            },
        ],
        [],
    )
    
    const data = useMemo(
        () => (Pengembalian?.response?.data?.data || []),
        [Pengembalian?.response?.data?.data ],
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
            initialState:{
                pageSize:10,
                sortBy: [{ id: 'created_at', desc: true }],
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


    return (
        <Container>
            <Waveup color="#B6D8CF" />
            <Wavebot color="#B6D8CF" />
            <Row>
                <Col className='my-5'>
                    <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4">
                        <CardBody>
                            {/* <Row>
                                <Col className='text-center'>
                                    {(editMessage || deleteMessage) ?
                                        <Alert variant={editMessage? 'success' : 'danger'} dismissible>{editMessage && editMessage.data.message || deleteMessage && deleteMessage.message}</Alert>
                                        :
                                        null
                                    }
                                </Col>
                            </Row> */}
                            <Row className="mb-2">
                                <Col>
                                    <b>Validasi Pengembalian</b>
                                </Col>
                                <Col className='d-flex justify-content-end'>
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
                                        <table {...getTableProps()} className='table align-middle table-nowrap table-hover'>
                                            <thead className='custom-theader6'>
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
                                                            {(Pengembalian.loading) ? 'Memuat data...' : 'Tidak ada data.'}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody {...getTableBodyProps()} className='text-center custom-tbody4'>
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
                                        <ul className="pagination pagination-sm justify-content-end mb-2">
                                            {/* First */}
                                            <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(0)} tabIndex="-1">
                                                    {'<<'}
                                                </a>
                                            </li>
                                            {/* Previus */}
                                            <li className={`page-item ${state.pageIndex === 0 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(state.pageIndex - 1)} tabIndex="-1">{'<'}</a>
                                            </li>
                                            {Array.from({ length: pageCount }, (_, index) => index + 1).map((key, index) => (
                                                <li key={key} className={`page-item ${index === state.pageIndex ? 'active' : ''}`}>
                                                    <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(index)}>{index + 1}</a>
                                                </li>
                                            ))}
                                            {/* Next */}
                                            <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(state.pageIndex + 1)}>{'>'}</a>
                                            </li>
                                            {/* Last */}
                                            <li className={`page-item ${state.pageIndex === pageCount - 1 ? 'hide-pagination' : ''}`}>
                                                <a className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(pageCount - 1)}>
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