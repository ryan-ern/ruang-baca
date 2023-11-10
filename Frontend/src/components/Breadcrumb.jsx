import { Link, useLocation } from 'react-router-dom';
import "../assets/styles/breadcrumb.css";

export default function Breadcrumbs() {
    const location = useLocation();

    const isPanelPage = location.pathname === "/panel";
    const isPengembalianOrPeminjamanPage = location.pathname.startsWith("/panel/pengembalian") || location.pathname.startsWith("/panel/peminjaman");

    return (
        <nav>
            <Link to="/panel"
                className={
                    isPanelPage ? "breadcrumb-active" : "breadcrumb-not-active"
                }
            >
                Buku Berdasarkan Jurusan
            </Link>
            {isPanelPage ? (
                null
            ) : (
                <>
                    <span className="breadcrumb-arrow">&gt;</span>
                    <Link to="/products"
                        className={
                            isPengembalianOrPeminjamanPage ? "breadcrumb-active" : "breadcrumb-not-active"
                        }
                    >
                        jurusan
                    </Link>
                </>
            )}
        </nav>
    );
}
