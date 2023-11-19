import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, } from "react-router-dom";
import { useEffect } from "react";
import "../../assets/styles/header.css";
import IMAGES from "../../assets/images";
import {  useSelector } from "react-redux";
// import { logout } from "../../store/auth/actions";

export default function Navigation() {
    const location = useLocation();
    // const dispatch = useDispatch()
    // const navigate = useNavigate()
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
                                    {features.includes('Dashboard Siswa')|| features.includes('Dashboard Admin')?(
                                        <li className="nav-item">
                                            <Link to="/panel" className="nav-link">
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
                                    {features.includes('Kontrol Akun') ? (
                                        <li className="nav-item">
                                            <Link to="/panel/account-control" className="nav-link">
                                            Kontrol Akun
                                            </Link>
                                        </li>
                                    ) : null}
                                    {features.includes('Denda') ? (
                                        <li className="nav-item">
                                            <Link to="/panel/penalty-settings" className="nav-link">
                                            Pengaturan Denda
                                            </Link>
                                        </li>
                                    ) : null}
                                </ul>
                            </Nav>
                            <Navbar.Text className="d-flex">
                                <Link to="/panel/profil" className="nav-link">
                                    <img
                                        src={IMAGES.profil}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top rounded-circle me-2"
                                        alt="React Vite logo"
                                    />
                                    Dean
                                    
                                        
                                </Link>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}
