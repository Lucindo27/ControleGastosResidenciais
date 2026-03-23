import { useNavigate } from "react-router-dom";
import '../../App.css';

export default function Menu() {
    const navigate = useNavigate();

    return (

        <div className="containerMenu">
            <h1 className="tituloMenu">Controle de Gastos</h1>

            <div className="menu">
                <button onClick={() => navigate("/pessoas")}>Pessoas</button>
                <button onClick={() => navigate("/categorias")}>Categorias</button>
                <button onClick={() => navigate("/transacoes")}>Transações</button>
                <button onClick={() => navigate("/relatorios")}>Relatórios</button>
            </div>
        </div>
    );
}
