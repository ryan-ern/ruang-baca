import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../assets/styles/common.css";
import { Card, Button } from "react-bootstrap";
import IMAGES from "../assets/images";

export default function Carouselcard() {
  const handleClick = (index) => {
    // Fungsi yang akan dijalankan saat card diklik
    console.log(`Card dengan index ${index} diklik!`);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  const cardsData = [
    {
      description: "Akuntansi dan Keuangan Lembaga",
      imageSrc: IMAGES.akuntan,
    },
    {
      description: "Multimedia",
      imageSrc: IMAGES.multimedia,
    },
    {
      description: "Teknik Komputer & Jaringan",
      imageSrc: IMAGES.jarkom,
    },
    {
      description: "Rekayasa Perangkat Lunak",
      imageSrc: IMAGES.rpl,
    },
    {
      description: "Teknik Kendaraan Ringan",
      imageSrc: IMAGES.tkr,
    },
    {
      description: "Keperawatan",
      imageSrc: IMAGES.keperawatan,
    },
    {
      description: "Farmasi Klinis dan Komunitas",
      imageSrc: IMAGES.farmasi,
    },
    {
      description: "Pemasaran",
      imageSrc: IMAGES.pemasaran,
    },
    {
      description: "Teknik Sepeda Motor",
      imageSrc: IMAGES.tsm,
    },

    // Tambahkan kartu lain sesuai kebutuhan
  ];

  return (
    <Carousel responsive={responsive}>
      {cardsData.map((card, index) => (
        <Card
          key={index}
          text="black"
          className="text-center cardjurusan p-0 m-2 me-3"
          onClick={() => handleClick(index)}
        >
          <Card.Body className="cardjurusan-body">
            <Card.Text className="cardjurusan-text">
              {card.description}
            </Card.Text>
            <Card.Img className="cardjurusan-img" src={card.imageSrc} />
          </Card.Body>
        </Card>
      ))}
    </Carousel>
  );
}
