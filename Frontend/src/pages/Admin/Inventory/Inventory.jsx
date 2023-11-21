import { useMemo, useState } from 'react'
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {
    useTable, useSortBy, useGlobalFilter, usePagination,
} from 'react-table';
// import { inventory } from '../../../store/inventory/actions';
import Waveup from '../../../components/background/Wavetop';
import Wavebot from '../../../components/background/Wavebot';
import ModalInventory from './modal';
import ModalDetailBuku from '../../../components/modal';
import Top from './top';

export default function Inventory() {
    // const dispatch = useDispatch()
    const inv = useSelector((state) => state.inventory)

    // useEffect(() => {
    //     dispatch(inventory())
    // }, [])

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: (_, index) => index + 1
            },
            {
                Header: 'Judul Buku',
                accessor: 'judul',
                Cell: ({value}) => (value)
            },
            {
                Header: 'ISBN',
                accessor: 'isbn',
                Cell: ({value}) => (value),
            },
            {
                Header: 'Penerbit',
                accessor: 'penerbit',
                Cell: ({value}) => (value),
            },
            {
                Header: 'Tahun Terbit',
                accessor: 'tahun_terbit',
                Cell: ({value}) => (value),
            },
            {
                Header: 'Stok',
                accessor: 'stok_buku',
                Cell: ({value}) => (value),
            },
            {
                Header: 'Aksi',
                id: 'actions',
                disableSortBy: true,
                Cell: ({row}) => (
                    <div>
                        <Button
                            variant='success'
                            onClick={() => {
                                setSelectedBook(row.original);
                                setShowModalDetail(true);
                            }}
                            className='px-2 mx-2'
                        >detail</Button>
                        <Button
                            variant='warning'
                            onClick={() => {
                                setSelectedBook(row.original);
                                setShowModal(true);
                            }}
                            className='px-2 mx-2'
                        >Edit</Button>
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
            initialState:{
                pageSize:10,
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )
    
    const { globalFilter } = state

    const [showModal, setShowModal] = useState(false);
    const [showModalDetail, setShowModalDetail] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleClose = () => {
        setShowModal(false)
        setShowModalDetail(false)
    };


    return (
        <Container>
            <Waveup color="#B6D8CF" />
            <Wavebot color="#B6D8CF" />
            <Row>
                <Col className='my-5'>
                    <Card className="bg-card">
                        <CardBody>
                            <Row className="mb-2">
                                <Col sm="3">
                                    <div className="mb-2 d-inline-block">
                                        <div className="position-relative">
                                            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data buku" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
                                        </div>
                                    </div>
                                </Col>
                                <Col sm="3">
                                    <Top/>
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
                                                            {(inv.loading) ? 'Memuat data...' : 'Tidak ada data.'}
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
            <ModalInventory show={showModal} onHide={handleClose} editdata={selectedBook} />
            <ModalDetailBuku show={showModalDetail} onHide={handleClose} data={selectedBook} />
        </Container>
    )
}