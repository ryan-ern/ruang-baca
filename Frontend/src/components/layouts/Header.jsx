import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import { useEffect, } from "react";
import "../../assets/styles/header.css";
import { useSelector } from "react-redux";

export default function Navigation() {
    const location = useLocation();
    const auth = useSelector((state) => state.auth);
    const features = auth?.response.feature || [];

    const removeActivation = (items) => {
        for (let i = 0; i < items.length; ++i) {
            const item = items[i];
            const parent = items[i].parentElement;
            if (item && item.classList.contains("active")) {
                item.classList.remove("active");
            }
            if (parent) {
                if (parent.classList.contains("active")) {
                    parent.classList.remove("active");
                }
            }
        }
    };

    function activate(item) {
        item.classList.add("active");
    }

    const navigate = useNavigate()

    useEffect(() => {
        let matchingMenuItem = null;
        const ul = document.getElementById("navigation");
        const items = ul.querySelectorAll("a");
        removeActivation(items);
        for (let i = 0; i < items.length; ++i) {
            if (window.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) activate(matchingMenuItem);
    }, [location]);


    return (
        <>
            <div className="m-2">
                <Navbar
                    style={{ backgroundColor: "#e0f8f2" }}
                    fixed="top"
                    collapseOnSelect
                    expand="lg"
                >
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto" id="navigation">
                                <ul className="navbar-nav">
                                    {features.includes('Dashboard Siswa') || features.includes('Dashboard Admin') ? (
                                        <li className="nav-item">
                                            <Link to="/panel" className="nav-link active">
                                                Beranda
                                            </Link>
                                        </li>
                                    ) : null}

                                    {features.includes('Peminjaman') ? (
                                        <li className="nav-item">
                                            <Link to="/panel/peminjaman" className="nav-link">
                                                Peminjaman
                                            </Link>
                                        </li>
                                    ) : null}

                                    {features.includes('Pengembalian') ? (
                                        <li className="nav-item">
                                            <Link to="/panel/pengembalian" className="nav-link">
                                                Pengembalian
                                            </Link>
                                        </li>
                                    ) : null}

                                    {features.includes('Inventory') ? (
                                        <li className="nav-item">
                                            <Link to="/panel/inventory" className="nav-link">
                                                inventaris
                                            </Link>
                                        </li>
                                    ) : null}

                                    {features.includes('Validasi Peminjaman') ? (
                                        <li className="nav-item">
                                            <Link to="/panel/borrow-validation" className="nav-link">
                                                Validasi Peminjaman
                                            </Link>
                                        </li>
                                    ) : null}

                                    {features.includes('Validasi pengembalian') ? (
                                        <li className="nav-item">
                                            <Link to="/panel/return-validation" className="nav-link">
                                                Validasi Pengembalian
                                            </Link>
                                        </li>
                                    ) : null}

                                    <li className="nav-item">
                                        <Link to="/panel/daily-present" className="nav-link">
                                            Scan Kehadiran
                                        </Link>
                                    </li>


                                    {features.includes('Denda') && features.includes('jurusan') && features.includes('Kontrol Akun') ? (
                                        <li className="nav-item">
                                            <NavDropdown
                                                id="dropdown-basic"
                                                title="Pengaturan"
                                                menuVariant="light"
                                            >
                                                <NavDropdown.Item>
                                                    <span onClick={() => navigate('/panel/account-control')} className="nav-link">
                                                        Kontrol Akun
                                                    </span>
                                                </NavDropdown.Item>

                                                <NavDropdown.Item >
                                                    <span onClick={() => navigate('/panel/fined-settings')} className="nav-link ">
                                                        Pengaturan Denda
                                                    </span>
                                                </NavDropdown.Item>

                                                <NavDropdown.Item >
                                                    <span onClick={() => navigate('/panel/major-settings')} className="nav-link ">
                                                        Pengaturan Jurusan
                                                    </span>
                                                </NavDropdown.Item>

                                                <NavDropdown.Item >
                                                    <span onClick={() => navigate('/panel/whatsapp-settings')} className="nav-link">
                                                        Notifikasi WhatsApp
                                                    </span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </li>
                                    ) : null}

                                </ul>
                            </Nav>
                            <Navbar.Text className="d-flex">
                                <Link to="/panel/profil" className="nav-link">
                                    <img
                                        src={auth?.response?.data?.profile}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top rounded-circle me-2"
                                        alt="React Vite logo"
                                    />
                                    {auth?.response?.data?.name}
                                </Link>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}
