import { useState } from "react";
import { Button } from "react-bootstrap";
import ModalInventory from "./modal";

export default function Top() {
    const [showModal, setShowModal] = useState(false);
    const addModal = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false)
    };
    return (
        <div className="mb-2 d-inline-block">
            <div className="position-relative">
                <Button variant="success" className=" btn-table rounded-pill custom-button" onClick={addModal}>Tambah Buku</Button>
            </div>
            <ModalInventory show={showModal} onHide={handleClose} />
        </div>
    )
}