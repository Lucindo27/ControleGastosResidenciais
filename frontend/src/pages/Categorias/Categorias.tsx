import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categorias() {

    const [categorias, setCategorias] = useState<any[]>([]);
    const [descricao, setDescricao] = useState("");
    const [finalidade, setFinalidade] = useState("");
    const navigate = useNavigate();

    // Busca as categorias cadastradas
    function buscarCategorias() {
        fetch("http://localhost:5232/api/categoria")
            .then(res => res.json())
            .then(data => setCategorias(data));
    }

    useEffect(() => {
        buscarCategorias();
    }, []);

    // Envia uma nova categoria para ser salva
    function salvarCategoria() {

        // Verifica se o campo descrição foi preenchido 
        if (!descricao) {
            alert("Adicione alguma descrição!");
            return;
        }

        // Verifica se alguma finalidade foi selecionada
        if (!finalidade) {
            alert("Selecione a finalidade");
            return;
        }

        // Requisição POST para criar categoria
        fetch("http://localhost:5232/api/categoria", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                descricao: descricao,
                finalidade: finalidade
            })
        }).then(() => {
            setDescricao("");
            setFinalidade("despesa");
            buscarCategorias();
        });
    }

    // Volta para a tela principal
    function voltarMenu() {
        navigate("/");
    }

    return (

        <div className="containerCategorias">

            <button className="botaoVoltar" onClick={voltarMenu}>Voltar</button>

            <h2>Cadastro de Categorias</h2>

            <div className="formCategorias">
                <label>
                    Descrição:
                    <input type="text"
                        placeholder="Digite a descrição"
                        maxLength={400}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}></input>
                </label>

                <label>
                    Finalidade:
                    <select value={finalidade}
                        onChange={(e) => setFinalidade(e.target.value)}>
                        <option value="" disabled hidden>Selecione</option>
                        <option value="despesas">Despesas</option>
                        <option value="receita">Receita</option>
                        <option value="ambas">Ambas</option>
                    </select>
                </label>

                <button onClick={salvarCategoria}>Salvar</button>
            </div>

            <h3>Lista de Categorias</h3>
            <ul className="listaCategorias">
                {categorias.map((c) => (
                    <li key={c.id}>
                        <span className="infoListaPessoa">
                            {c.descricao} - {c.finalidade}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}