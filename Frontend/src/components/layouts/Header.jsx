import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../../assets/styles/header.css";
import IMAGES from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/actions";

export default function Navigation() {
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                                    {features.includes('Dashboard Siswa')?(
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
                                </ul>
                            </Nav>
                            <Navbar.Text className="d-flex">
                                <a href="#profile" className="nav-link" onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(logout(navigate));
                                }}>
                                    <img
                                        src={IMAGES.profil}
                                        width="30"
                                        height="30"
                                        className="d-inline-block align-top rounded-circle me-2"
                                        alt="React Vite logo"
                                    />
                                        Dean
                                </a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}
