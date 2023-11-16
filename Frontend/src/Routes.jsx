import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Index";
import { AuthStatus, Authenticated } from "./middleware/auth.middleware";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/register";
/**
 * User
 */
import Pengembalian from "./pages/User/Pengembalian/Pengembalian";
import Dashboard from "./pages/User/Dashboard/Dashboard";
import Peminjaman from "./pages/User/Peminjaman/Peminjaman";
import Page404 from "./components/Page404";
import { UseFeature } from "./middleware/features.middleware";

/**
 * Admin
 */

/**
 * Superadmin
 */

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <AuthStatus>
                <Routes>
                    <Route path="" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/panel" element={
                        <Authenticated>
                            <Layout />
                        </Authenticated>
                    }>
                        <Route path="/panel" element={<UseFeature allow="Dashboard Siswa" />}>
                            <Route index element={<Dashboard />}/>    
                        </Route>
                        <Route path="/panel/peminjaman" element={<UseFeature allow="Peminjaman" />}>
                            <Route index element={<Peminjaman />}/>    
                        </Route>
                        <Route path="/panel/pengembalian" element={<UseFeature allow="Pengembalian" />}>
                            <Route index element={<Pengembalian />}/>    
                        </Route>
                    </Route>
                    {/* Not Found */}
                    {/* <Route path="/404" element={<Page404 />} />*/}
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </AuthStatus>
        </BrowserRouter>
    );
}
