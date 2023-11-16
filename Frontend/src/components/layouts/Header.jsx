import { Container, Dropdown, DropdownMenu, DropdownToggle, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/styles/header.css";
import IMAGES from "../../assets/images";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth/actions";

export default function Navigation() {
    const [menu, setMenu] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                                    <li className="nav-item">
                                        <Link to="/panel" className="nav-link">
                      Beranda
                                        </Link>
                                    </li>
                                </ul>

                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/panel/peminjaman" className="nav-link">
                      Peminjaman
                                        </Link>
                                    </li>
                                </ul>

                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to="/panel/pengembalian" className="nav-link">
                      Pengembalian
                                        </Link>
                                    </li>
                                </ul>
                            </Nav>
                            <Dropdown
                                isOpen={menu}
                                toggle={() => setMenu(!menu)}
                                className="d-inline-block"
                            >
                                <DropdownToggle className="btn header-item" id="page-header-user-dropdown" tag="button">
                                    <img className="rounded-circle header-profile-user" src={IMAGES.profil} alt="react logo" />
                                    <span className="d-none d-xl-inline-block ms-2 me-1">Profile</span>
                                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <Link to="/panel/user/profile" className="dropdown-item">
                                        <i className="bx bx-user font-size-16 align-middle me-1" />
                                        <span>Profil Saya</span>
                                    </Link>
                                    <div className="dropdown-divider" />
                                    <Link to="#" className="dropdown-item" onClick={() => dispatch(logout(navigate))}>
                                        <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                                        <span>Keluar</span>
                                    </Link>
                                </DropdownMenu>
                            </Dropdown>
                            {/* <Navbar.Text>
                                <img
                                    src={IMAGES.profil}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top rounded-circle me-2"
                                    alt="React Vite logo"
                                />
                                <a href="#profile" onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(logout(navigate));
                                }}>Dean</a>
                            </Navbar.Text> */}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}
