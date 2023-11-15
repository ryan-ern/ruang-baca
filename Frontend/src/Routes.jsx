import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Index";
import Pengembalian from "./pages/Pengembalian";
import Login from "./pages/Login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Peminjaman from "./pages/Peminjaman";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/panel" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/panel/peminjaman" element={<Peminjaman />} />
          <Route path="/panel/pengembalian" element={<Pengembalian />} />
        </Route>
        {/* Not Found */}
        {/* <Route path="/404" element={<Page404 />} />
                <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
