import Waveup from "../components/background/Wavetop";
import "../assets/styles/dashboard.css";
import { Button } from "react-bootstrap";


export default function Page404() {
    return(
        <>
            <Waveup color="#e0f8f2" bg="#ffffff" />
            <div className="text-center pt-5 ">
                <h1 className="not-found">404</h1>
                <p>Halaman yang Anda cari tidak ditemukan.</p>
                <Button onClick="{}" className="btn btn-primary">
                        Kembali
                </Button>
            </div>
        </>
    );
}