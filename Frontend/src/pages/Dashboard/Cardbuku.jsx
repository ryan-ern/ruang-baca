import React from "react";
import { Card, Button } from "react-bootstrap"; // Menggunakan komponen Card dari react-bootstrap
import IMAGES from "../../assets/images";

export default function Cardbuku() {
    const handleClick = (index) => {
    // Fungsi yang akan dijalankan saat card diklik
        console.log(`Card dengan index ${index} diklik!`);
    };

    const cardsData = [
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
        {
            title: "Loneliness is My Best Friend",
            author: "Alvi Syahrin",
            imageSrc: IMAGES.buku1,
        },
    // Tambahkan kartu lain sesuai kebutuhan
    ];

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
            }}
        >
            {cardsData.map((card, index) => (
                <Card
                    key={index}
                    text="black"
                    className="text-center cardbuku p-0 m-2 me-3 mb-5"
                    onClick={() => handleClick(index)}
                >
                    <Card.Body className="cardbuku-body">
                        <Card.Img
                            className=""
                            src={card.imageSrc}
                            style={{
                                borderRadius: "6px",
                                maxHeight: "120px",
                                objectFit: "cover",
                                width: "100%",
                            }}
                        />
                        <Card.Text className="cardbuku-judul">{card.title}</Card.Text>
                        <Card.Text className="cardbuku-text-author">
                            {card.author}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}
