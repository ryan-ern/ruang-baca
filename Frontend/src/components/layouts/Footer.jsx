import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <div className="md-auto py-3" style={{ backgroundColor: "#e0f8f2" }}>
      <Container>
        <Row>
          <Col className="text-center text-black">
            <b>
              <span>
                &copy;{new Date().getFullYear()} | Perpustakaan SMK Negeri 7
                Bandar Lampung
              </span>
            </b>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
