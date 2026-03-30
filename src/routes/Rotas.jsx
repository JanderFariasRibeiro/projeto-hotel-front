import { BrowserRouter, Route, Routes } from "react-router";
import Login from "../pages/auth/Login";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Funcionarios from "../pages/admin/Funcionarios";
import Cargos from "../pages/admin/Cargos";
import Quartos from "../pages/admin/Quartos";
import Clientes from "../pages/admin/Clientes";
import Reservas from "../pages/admin/Reservas";
import Pagamentos from "../pages/admin/Pagamentos";
import Perfil from "../pages/admin/Perfil";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="quartos" element={<Quartos />} />
                    <Route path="clientes" element={<Clientes />} />
                    <Route path="reservas" element={<Reservas />} />
                    <Route path="pagamentos" element={<Pagamentos />} />
                    <Route path="funcionarios" element={<Funcionarios />} />
                    <Route path="cargos" element={<Cargos />} />
                    <Route path="perfil" element={<Perfil />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;