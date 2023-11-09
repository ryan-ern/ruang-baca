import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Navigation() {
    return (
        <>
            <div className="m-2">
                <Navbar
                    style={{ backgroundColor: "#E0F8F2", fontFamily: "Montserrat" }}
                    variant="light"
                    fixed="top"
                    collapseOnSelect
                    expand="lg"
                    className="bg-body-tertiary"
                >
                    <Container>
                        <Navbar.Brand href="#home">RUANG BACA</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#beranda">Beranda</Nav.Link>
                                <Nav.Link href="#features">Peminjaman</Nav.Link>
                                <Nav.Link href="#pricing">Pengembalian</Nav.Link>
                            </Nav>
                            <Navbar.Text>
                                <img
                                    src="../../imageprofil.jpg"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top rounded-circle me-2"
                                    alt="React Bootstrap logo"
                                />
                                {"     "}
                                <a href="#profile">Dean</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}

