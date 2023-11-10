import React from "react";
import { Card, Button } from "react-bootstrap"; // Menggunakan komponen Card dari react-bootstrap

const cardsData = [
  {
    title: "Card 1",
    description: "Deskripsi Kartu 1",
    variant: "primary", // Warna latar belakang
    imageSrc: "path-to-image-1.jpg", // Ganti dengan sumber gambar yang sesuai
  },
  {
    title: "Card 2",
    description: "Deskripsi Kartu 2",
    variant: "secondary",
    imageSrc: "path-to-image-2.jpg",
  },
  {
    title: "Card 2",
    description: "Deskripsi Kartu 2",
    variant: "secondary",
    imageSrc: "path-to-image-2.jpg",
  },
  {
    title: "Card 2",
    description: "Deskripsi Kartu 2",
    variant: "secondary",
    imageSrc: "path-to-image-2.jpg",
  },
  {
    title: "Card 2",
    description: "Deskripsi Kartu 2",
    variant: "secondary",
    imageSrc: "path-to-image-2.jpg",
  },
  {
    title: "Card 2",
    description: "Deskripsi Kartu 2",
    variant: "secondary",
    imageSrc: "path-to-image-2.jpg",
  },
  {
    title: "Card 2",
    description: "Deskripsi Kartu 2",
    variant: "secondary",
    imageSrc: "path-to-image-2.jpg",
  },
  {
    title: "Card 2",
    description: "Deskripsi Kartu 2",
    variant: "secondary",
    imageSrc: "path-to-image-2.jpg",
  },
  {
    title: "Card 2",
    description: "Deskripsi Kartu 2",
    variant: "secondary",
    imageSrc: "path-to-image-2.jpg",
  },
  // Tambahkan kartu lain sesuai kebutuhan
];

function Cardbuku() {
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
          bg={card.variant}
          text="white"
          className="p-0 pt-2 m-2 me-3"
          style={{ width: "8rem", borderRadius: "12px", height: "fit-content" }}
        >
          <Card.Img variant="top" src={card.imageSrc} />
          <Card.Body className="p-2">
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cardbuku;
