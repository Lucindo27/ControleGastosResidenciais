import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Pessoas() {

    const [pessoas, setPessoas] = useState<any[]>([]);
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [pessoaEditando, setPessoaEditando] = useState<any>(null);
    const navigate = useNavigate();    

    // Busca as pessoas cadastradas
    function buscarPessoas() {
        fetch("http://localhost:5232/api/pessoa")
            .then(res => res.json())
            .then(data => setPessoas(data));
    }

    // Envia uma nova pessoa para ser salva
    function salvarPessoa() {

        const idadePessoa = Number(idade);

        // Verifica se o campo nome foi preenchido
        if (!nome.trim()) {
            alert("O nome é obrigatório");
            return;
        }

        // Verifica se a idade foi preenchida corretamente
        if (idadePessoa < 0 || idade === "") {
            alert("É necessário preencher a idade corretamente!");
            return;
        }

        // Requisição POST para criar uma pessoa
        fetch("http://localhost:5232/api/pessoa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nome,
                idade: idadePessoa
            })
        }).then(() => {
            setNome("");
            setIdade("");
            buscarPessoas();
        });
    }

    // Deleta uma pessoa do banco
    function deletarPessoa(id: number) {
        const confirmar = window.confirm("Tem certeza que deseja deletar esta pessoa?");

        if (!confirmar) return;
        fetch(`http://localhost:5232/api/pessoa/${id}`, {
            method: "DELETE"
        }).then(() => buscarPessoas());
    }

    function editarPessoa(p: any) {
        setPessoaEditando(p);
        setModalAberto(true);
    }

    // Salva as alterações feitas em uma pessoa
    function salvarEdicao() {

        const idadePessoa = Number(pessoaEditando.idade);

        // Verifica se o campo nome foi preenchido
        if (!pessoaEditando.nome.trim()) {
            alert("O nome é obrigatório");
            return;
        }

        // Verifica se a idade foi preenchida corretamente
        if (idadePessoa < 0 || pessoaEditando.idade === "") {
            alert("É necessário preencher a idade corretamente!");
            return;
        }

        // Requisição PUT para atualizar pessoa
        fetch(`http://localhost:5232/api/pessoa/${pessoaEditando.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pessoaEditando)
        })
            .then(() => {
                setModalAberto(false);
                setPessoaEditando(null);
                buscarPessoas();
            });
    }

    useEffect(() => {
        buscarPessoas();
    }, []);

    // Volta para a tela principal
    function voltarMenu() {
        navigate("/");
    }

    return (
        <>
            <div className="containerPessoas">

                <button className="botaoVoltar" onClick={voltarMenu}>Voltar</button>

                <h2>Cadastro de Pessoas</h2>

                <div className="formPessoas">
                    <label>Nome:</label>
                    <input type="text"
                        placeholder="Digite seu nome"
                        maxLength={200}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <label>Idade:</label>
                    <input type="number"
                        placeholder="Digite sua idade"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                    />

                    <button onClick={salvarPessoa}>Salvar</button>
                </div>

                <h3>Lista de Pessoas</h3>
                <ul className="listaPessoas">
                    {pessoas.map((p) => (
                        <li key={p.id}>
                            <span className="infoListaPessoa">{p.nome} - {p.idade} anos</span>
                            <div className="botoesListaPessoas">
                                <button className="btn-editar" onClick={() => editarPessoa(p)}>
                                    <FaEdit />
                                </button>
                                <button className="btn-deletar" onClick={() => deletarPessoa(p.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {modalAberto && (
                <div className="dialogEditar">
                    <div className="modalEditar">
                        <h3>Editar Pessoa</h3>

                        <input
                            type="text"
                            value={pessoaEditando.nome}
                            onChange={(e) =>
                                setPessoaEditando({
                                    ...pessoaEditando,
                                    nome: e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            value={pessoaEditando.idade}
                            onChange={(e) =>
                                setPessoaEditando({
                                    ...pessoaEditando,
                                    idade: Number(e.target.value)
                                })
                            }
                        />

                        <div className="modalBotoes">
                            <button onClick={salvarEdicao}>Salvar</button>
                            <button onClick={() => setModalAberto(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}