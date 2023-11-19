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
import Profil from "./pages/User/Profil/Profil";
import Inventory from "./pages/Admin/Inventory/Inventory";
import { useSelector } from "react-redux";

/**
 * Admin
 */

/**
 * Superadmin
 */

export default function RoutesApp() {
    const role = useSelector((state) => state?.auth?.response?.data?.role)
    const dashboardElement = role === 'admin' || role === 'Super Admin' ? <Inventory /> : <Dashboard />;
    const featureAllow = role === 'admin' || role === 'Super Admin' ? "Dashboard Admin" : "Dashboard Siswa";
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
                        <Route path="/panel" element={<UseFeature allow={featureAllow} />}>
                            <Route index element={dashboardElement}/>    
                        </Route>
                        <Route path="/panel/peminjaman" element={<UseFeature allow="Peminjaman" />}>
                            <Route index element={<Peminjaman />}/>    
                        </Route>
                        <Route path="/panel/pengembalian" element={<UseFeature allow="Pengembalian" />}>
                            <Route index element={<Pengembalian />}/>    
                        </Route>
                        <Route path="/panel/inventory" element={<UseFeature allow="Inventory" />}>
                            <Route index element={<Inventory />}/>    
                        </Route>
                        <Route path="/panel/borrow-validation" element={<UseFeature allow="Validasi Peminjaman" />}>
                            <Route index element={<Inventory />}/>    
                        </Route>
                        <Route path="/panel/return-validation" element={<UseFeature allow="Validasi Pengembalian" />}>
                            <Route index element={<Inventory />}/>    
                        </Route>
                        <Route path="/panel/account-control" element={<UseFeature allow="Kontrol Akun" />}>
                            <Route index element={<Inventory />}/>    
                        </Route>
                        <Route path="/panel/penalty-settings" element={<UseFeature allow="Denda" />}>
                            <Route index element={<Inventory />}/>    
                        </Route>
                        <Route path="/panel/profil" element={<Profil/>}/>                       
                    </Route>
                    {/* Not Found */}
                    {/* <Route path="/404" element={<Page404 />} />*/}
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </AuthStatus>
        </BrowserRouter>
    );
}
