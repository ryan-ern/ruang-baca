import { useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ModalDetailBuku from "../../../components/modal";

export default function Cardbuku() {
    const books = useSelector((state) => state.book.response.data);

    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleClick = (index) => {
        setSelectedBook(books[index]);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            {books?.length === 0 ? (
                <Alert className="mt-2">Belum Ada Buku Terdaftar</Alert>
            ) : (
                books?.map((book, index) => (
                    <Card
                        key={index}
                        text="black"
                        className="text-center cardbuku pb-1 m-2 me-3 mb-5"
                        onClick={() => handleClick(index)}
                    >
                        <Card.Body className="cardbuku-body">
                            <Card.Img
                                src={book.cover}
                                style={{
                                    borderRadius: "6px",
                                    maxHeight: "120px",
                                    objectFit: "cover",
                                    width: "100%",
                                }}
                            />
                            <Card.Text className="cardbuku-judul">{book.judul}</Card.Text>
                            <Card.Text className="cardbuku-text-author">
                                {book.penulis}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
            <ModalDetailBuku show={showModal} onHide={handleClose} data={selectedBook} />
        </div>
    );
}
