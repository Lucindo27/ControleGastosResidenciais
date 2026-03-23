import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./pages/Menu/Menu";
import Pessoas from "./pages/Pessoas/Pessoas";
import Categorias from "./pages/Categorias/Categorias";
import Transacoes from "./pages/Transacoes/Transacoes";
import Relatorios from "./pages/Relatorios/Relatorios";

export default function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
      </BrowserRouter>
  );
}