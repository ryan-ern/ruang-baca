import { useEffect, useState } from "react";
import { Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dashboard } from "../../../store/dashboard/actions";
import ModalDetailBuku from "../../../components/modal";

export default function Cardbuku() {
    const dispatch = useDispatch();

    const books = useSelector((state) => state.book.response.data);
    useEffect(() => {
        dispatch(dashboard());
    }, []);

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
                justifyContent: "flex-start",
            }}
        >
            {books?.length === 0 ? (
                <Alert className="mt-2">Belum Ada Buku Terdaftar</Alert>
            ) : (
                books.map((book, index) => (
                    <Card
                        key={index}
                        text="black"
                        className="text-center cardbuku p-0 m-2 me-3 mb-5"
                        onClick={() => handleClick(index)}
                    >
                        <Card.Body className="cardbuku-body">
                            <Card.Img
                                className=""
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
