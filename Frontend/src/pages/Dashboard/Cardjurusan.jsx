import Card from "react-bootstrap/Card";

export default function Cardjurusan ({ title }) {
    return (
        <Card
            className="p-0 pt-2 m-2 me-3"
            style={{ width: "8rem", borderRadius: "12px", height: "fit-content" }}
        >
            <Card.Body className="p-2">
                <Card.Title className="text-center fs-6">{title}</Card.Title>
                <div className="text-center">
                    {/* <Card.Img
            src={image}
            style={{
              borderRadius: "6px",
              //   maxHeight: "120px",
              //   objectFit: "cover",
              //   width: "100%",
            }}
          /> */}
                </div>
            </Card.Body>
        </Card>
    );
}

