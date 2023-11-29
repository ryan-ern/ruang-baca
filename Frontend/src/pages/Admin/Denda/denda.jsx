import { Card, Col, Row } from "react-bootstrap";
import "../../../assets/styles/common.css";
import Waveup from "../../../components/background/Wavetop";
import Wavebot from "../../../components/background/Wavebot";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFined, putFined } from "../../../store/fined/actions";

export default function Fined() {
    const dispatch = useDispatch()
    const finedData = useSelector((state) => state.fined.response)
    const [data, setData] = useState({
        nominal: finedData?.denda?.nominal|| '',
        text: finedData?.denda?.text || ''
    })

    const [editData, setEditData] = useState(true);

    useEffect(() => {
        dispatch(getFined())
    }, [])
    
    const handleEditClick = () => {
        setEditData(false);
    };

    const handleSubmit = () => {
        dispatch(putFined(data))
        setEditData(true);
    }

    return (
        <div className="Container py-5">
            <Waveup color="#B6D8CF"/>
            <Wavebot color="#B6D8CF" />
            <Row className="justify-content-center">
                <Col md={10} lg={10} xl={8}>
                    <Card className="overflow-hidden p-4 border-0 shadow-lg rounded-4 mt-2">
                        <Card.Body className="p-sm-3">
                            <h5>Pengaturan Denda</h5>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                            }}>
                                <label className="mt-3">Denda Harian (Rp.)</label>
                                <input
                                    type="text"
                                    className="form-control mb-3" placeholder="1000"
                                    defaultValue={finedData?.denda?.nominal}
                                    disabled={editData}
                                    onChange={(e) => setData({...data, nominal: e.target.value})}>
                                </input>
                                <label>Ketentuan</label>
                                <textarea
                                    rows="5"
                                    className="bg-light responsive-textarea"
                                    placeholder="Masukkan Ketentuan Denda"
                                    name='ketentuan'
                                    defaultValue={finedData?.denda?.text}
                                    required
                                    disabled={editData}
                                    onChange={(e) => setData({...data, text: e.target.value})}
                                ></textarea>
                                {editData ?
                                    <button
                                        className={`btn px-3 btn-info`}
                                        onClick={handleEditClick}
                                    >
                                        Edit
                                    </button>
                                    :
                                    <button
                                        className={`btn px-3 btn-success`}
                                        type="submit"
                                        onClick={handleSubmit}
                                    >
                                        Simpan
                                    </button>
                                }
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}