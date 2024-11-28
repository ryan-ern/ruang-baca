import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import { downloadPresent, generateBarcode, getPresent, scanBarcode } from "../../../store/actions";
import { Alert, Button, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import Waveup from "../../../components/background/Wavetop";
import Wavebot from "../../../components/background/Wavebot";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import moment from 'moment';
import DateRangePicker from "react-bootstrap-daterangepicker";


export default function Present() {
    const dispatch = useDispatch();
    const { loading, response, presents } = useSelector((state) => state.present);
    const user = useSelector((state) => state?.auth?.response?.data);
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [useFrontCamera, setUseFrontCamera] = useState(false);
    const webcamRef = useRef(null);

    const videoConstraints = {
        facingMode: useFrontCamera ? "user" : { exact: "environment" },
    };

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: (_, index) => index + 1
            },
            {
                Header: 'Nama Siswa',
                accessor: 'name',
                Cell: ({ value }) => (value)
            },
            {
                Header: 'Waktu Hadir',
                accessor: 'scan_time',
                Cell: ({ value }) => moment(value).format('DD-MM-YYYY HH:mm')
            },
            {
                Header: 'Jurusan',
                accessor: 'jurusan',
                Cell: ({ value }) => (value)
            },
        ],
        [],
    )
    const data = useMemo(
        () => (presents?.data || []),
        [presents?.data]
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
                    { id: 'scan_time', desc: true },
                ],
            }
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )
    const { globalFilter } = state

    // Fetch barcode when component mounts
    useEffect(() => {
        if (user.role !== "siswa") {
            dispatch(generateBarcode());
            dispatch(getPresent())
        }
    }, [dispatch]);

    const handleScanBarcode = (barcode) => {
        if (barcode) {
            dispatch(scanBarcode({ username: user.username, name: user.name, barcode }));
        }
    };

    const enableCamera = () => setCameraEnabled(true);

    const toggleCamera = () => {
        setUseFrontCamera(!useFrontCamera);
    };

    // Scan barcode using the webcam
    useEffect(() => {
        const scanInterval = setInterval(() => {
            if (webcamRef.current && webcamRef.current.video.readyState === 4) {
                const video = webcamRef.current.video;
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                console.log(code.data)

                if (code) {
                    handleScanBarcode(code.data);
                    clearInterval(scanInterval);
                    setCameraEnabled(false);
                }
            }
        }, 500);

        return () => clearInterval(scanInterval);
    }, [webcamRef, cameraEnabled]);

    const handleDownload = (event, picker) => {
        if (picker.startDate && picker.endDate) {
            const startDate = picker.startDate.format('YYYY-MM-DD');
            const endDate = picker.endDate.format('YYYY-MM-DD');
            dispatch(downloadPresent(startDate, endDate));
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
                    <Card className="overflow-hidden p-4 pt-2 pb-2 border-0 shadow-lg rounded-4">
                        <CardBody>
                            <Row>
                                <Col className='text-center'>
                                    {response?.status ? <Alert variant={response.status === 200 ? "success" : "danger"} dismissible>{response.message}</Alert> : null}
                                    {user.role !== "siswa" && (
                                        <div>
                                            <h2>Barcode Kehadiran Hari ini</h2>
                                            {loading ? (
                                                <p>Loading barcode...</p>
                                            ) : (
                                                <img src={response.data} alt="Generated Barcode" style={{ width: "300px", height: "300px" }} />
                                            )}
                                        </div>
                                    )}

                                    <div style={{ marginTop: "30px" }}>
                                        <h2>Scan Kehadiran</h2>
                                        {cameraEnabled ? (
                                            <div>
                                                <Webcam
                                                    ref={webcamRef}
                                                    style={{ width: "100%", height: "auto" }}
                                                    videoConstraints={videoConstraints}
                                                />
                                                <Button className="btn-table rounded custom-button" variant="success" onClick={toggleCamera} style={{ marginTop: "10px" }}>
                                                    kamera {useFrontCamera ? "belakang" : "depan"}
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button className="btn-table rounded-pill custom-button" onClick={enableCamera}>Mulai Scan</Button>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            {user.role !== "siswa" && (
                                <div>
                                    <hr />
                                    <Row className="mb-3">
                                        <Col>
                                            <p className=" fw-bold">Data Kehadiran</p>
                                        </Col>
                                        <Col className='d-flex justify-content-end'>
                                            <DateRangePicker onApply={handleDownload} initialSettings={{ showDropdowns: true }}>
                                                <button className="btn-table rounded-pill custom-button">Download</button>
                                            </DateRangePicker>
                                            <div className="position-relative px-3">
                                                <input type="text" value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data kehadiran" className="form-control" style={{ backgroundColor: '#f3f6f9' }} />
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
                                                                    {presents.loading ? 'Memuat data...' : 'Tidak ada data.'}
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
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
