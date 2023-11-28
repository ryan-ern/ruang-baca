import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
    useTable, useSortBy, useGlobalFilter, usePagination,
} from 'react-table';
import Waveup from '../../../components/background/Wavetop';
import Wavebot from '../../../components/background/Wavebot';
import { account, clearAccountMessage, deleteAccount } from '../../../store/account/actions';
import ModalAccount from './modal';

export default function Account() {
    const dispatch = useDispatch()
    const acc = useSelector((state) => state.account)
    const editMessage = useSelector((state) => state.account.edit.message)
    const deleteMessage = useSelector((state) => state.account.delete.message)
    const addMessage = useSelector((state) => state.account.add.message)
    const columns = useMemo(
        () => {
            const baseColumns = [
                {
                    Header: 'No',
                    accessor: (_, index) => index + 1,
                },
                {
                    Header: 'NISN',
                    accessor: 'nisn',
                    Cell: ({ value }) => value,
                },
                {
                    Header: 'Username',
                    accessor: 'username',
                    Cell: ({ value }) => value,
                },
                {
                    Header: 'Nama',
                    accessor: 'name',
                    Cell: ({ value }) => value,
                },
                {
                    Header: 'Jurusan',
                    accessor: 'jurusan',
                    Cell: ({ value }) => value,
                },
            ];

            if (acc.response.message !== 'Anda Admin') {
                baseColumns.push({
                    Header: 'Akses',
                    accessor: 'role',
                    Cell: ({ value }) => value,
                });
            }

            baseColumns.push({
                Header: 'Aksi',
                id: 'actions',
                disableSortBy: true,
                Cell: ({ row }) => (
                    <div className='text-center'>
                        <div className='text-center'>
                            <Button
                                variant='warning'
                                onClick={() => {
                                    setSelectedAccount(row.original);
                                    setShowModal(true);
                                }}
                                className='px-2 mx-2 mt-2'
                            >Edit</Button>
                            <Button
                                variant='success'
                                onClick={() => {
                                    setSelectedAccount(row.original);
                                // setShowModal(true);
                                }}
                                className='px-3 mx-2 mt-2'
                            >Blokir</Button>
                            <Button
                                variant='danger'
                                onClick={() => {
                                    if (window.confirm("Apakah Anda Yakin Untuk Menghapus Akun :" + row.original.name)) handleclick(row.original.username);
                                }}
                                className='px-3 mx-2 mt-2'
                            >Hapus</Button>
                        </div>
                    </div>
                ),
            });

            return baseColumns;
        },
        [acc.response.message]
    );
    
    const data = useMemo(
        () => (acc.response?.data || []),
        [acc.response.data],
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
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [addAccount, setAddAccount] = useState(null);

    const handleclick = (data) => {
        dispatch(deleteAccount(data))
    };

    const handleClose = () => {
        setShowModal(false)
        setAddAccount(null)
        setSelectedAccount(null)
    };

    useEffect(() => {
        dispatch(account())
    }, [])

    const handleDismiss = () => {
        dispatch(clearAccountMessage());
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
                                    {addMessage ? <Alert dismissible onClose={handleDismiss} variant='success'>{addMessage && addMessage.data.message}</Alert> :
                                        (editMessage || deleteMessage) ?
                                            <Alert variant={editMessage? 'info' : 'danger'} dismissible onClose={handleDismiss}>{editMessage && editMessage.data.message || deleteMessage && deleteMessage.message}</Alert>
                                            :
                                            null
                                    }
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <div>Kontrol Akun</div>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <div className="mb-2 d-inline-block">
                                        <div className="position-relative">
                                            <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data pengguna" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
                                        </div>
                                    </div>
                                </Col>
                                {acc.response.message === 'Anda Admin' ? null :
                                    <Col className='d-flex justify-content-end'>
                                        <button onClick={() => { setAddAccount('tambah'); setShowModal(true);}} className='btn btn-success px-3'>Tambah Admin</button>
                                    </Col>
                                }
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className='table align-middle table-nowrap table-hover'>
                                            <thead className='custom-theader5'>
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
                                                            {(acc.loading) ? 'Memuat data...' : 'Tidak ada data.'}
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
            <ModalAccount show={showModal} onHide={handleClose} editdata={selectedAccount} add={addAccount} />
        </Container>
    )
}