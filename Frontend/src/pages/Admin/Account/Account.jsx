import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
    useTable, useSortBy, useGlobalFilter, usePagination,
} from 'react-table';
import Waveup from '../../../components/background/Wavetop';
import Wavebot from '../../../components/background/Wavebot';
import { account, clearAccountMessage, postBlock, postUnblock } from '../../../store/account/actions';
import ModalAccount from './modal';
import ModalKonfirmasi from '../../../components/modalkonfirmasi';
import moment from 'moment';

export default function Account() {
    const dispatch = useDispatch()
    const acc = useSelector((state) => state.account)
    const editMessage = useSelector((state) => state.account.edit.message)
    const deleteMessage = useSelector((state) => state.account.delete.message)
    const addMessage = useSelector((state) => state.account.add.message)
    const activeMessage = useSelector((state) => state.account.active.message)
    // console.log(activeMessage)
    const columns = useMemo(
        () => {
            const baseColumns = [
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
                {
                    Header: 'Diperbarui',
                    accessor: 'updated_at',
                    Cell: ({ value }) => moment(value).format('DD-MM-YYYY'),
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
                                className='btn-tbl-edit'
                            >Edit</Button>
                            {row.original.status === "blokir"
                                ?
                                <Button
                                    variant='success'
                                    onClick={() => {
                                        // setSelectedAccount(row.original);
                                        if (confirm("Yakin Ingin Aktivasi " + row.original.name)) dispatch(postUnblock(row.original.nisn))
                                        // console.log(row.original)
                                    }}
                                    className='btn-tbl-detail'
                                >Aktivasi</Button>
                                :

                                <Button
                                    variant='danger'
                                    onClick={() => {
                                        // setSelectedAccount(row.original);
                                        if (confirm("Yakin Ingin Blokir " + row.original.name)) dispatch(postBlock(row.original.nisn))
                                        // console.log(row.original)
                                    }}
                                    className='btn-tbl-delete'
                                >Blokir</Button>
                            }
                            <Button
                                variant='danger'
                                onClick={() => {
                                    setSelectedAccount(row.original.username);
                                    setShowModalDelete(true);

                                }}
                                className='btn-tbl-delete'
                            >Delete</Button>
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
            initialState: {
                pageSize: 10,
                sortBy: [
                    { id: 'updated_at', desc: true },
                ],
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    const { globalFilter } = state

    const [showModal, setShowModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [addAccount, setAddAccount] = useState(null);

    // const handleclick = (data) => {
    //     dispatch(deleteAccount(data))
    // };

    const handleClose = () => {
        setShowModal(false)
        setAddAccount(null)
        setSelectedAccount(null)
        setShowModalDelete(false)
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
                                        (editMessage || deleteMessage || activeMessage) ?
                                            <Alert variant={editMessage ? 'info' : 'success'} dismissible onClose={handleDismiss}>{editMessage && editMessage.data.message || deleteMessage && deleteMessage.message || activeMessage && activeMessage.message}</Alert>
                                            :
                                            null
                                    }
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                    <b>Kontrol Akun</b>
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
                                        <Button onClick={() => { setAddAccount('tambah'); setShowModal(true); }} className="btn-table rounded-pill custom-button" variant="sucess">Tambah Admin</Button>
                                    </Col>
                                }
                            </Row>
                            <Row>
                                <Col>
                                    <div className='table-responsive'>
                                        <table {...getTableProps()} className="table align-middle table-nowrap table-hover">
                                            <thead className="custom-theader5">
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
                                                            {acc.loading ? 'Memuat data...' : 'Tidak ada data.'}
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
            <ModalAccount show={showModal} onHide={handleClose} editdata={selectedAccount} add={addAccount} />
            <ModalKonfirmasi show={showModalDelete} onHide={handleClose} data={selectedAccount} event="account" />
        </Container>
    )
}