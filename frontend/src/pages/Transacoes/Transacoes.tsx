
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Transacoes() {

  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [pessoaId, setPessoaId] = useState("");
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const pessoaSelecionada = pessoas.find(p => p.id == pessoaId);
  const categoriasFiltradas = categorias.filter(c => c.finalidade === tipo || c.finalidade === "ambas");
  const navigate = useNavigate();

  // Busca as pessoas cadastradas
  function buscarPessoas() {
    fetch("http://localhost:5232/api/pessoa")
      .then(res => res.json())
      .then(data => setPessoas(data));
  }

  // Busca as categorias cadastradas
  function buscarCategorias() {
    fetch("http://localhost:5232/api/categoria")
      .then(res => res.json())
      .then(data => setCategorias(data));
  }

  // Busca as transações cadastradas
  function buscarTransacoes() {
    fetch("http://localhost:5232/api/transacoes")
      .then(res => res.json())
      .then(data => setTransacoes(data));
  }

  useEffect(() => {
    buscarPessoas();
    buscarCategorias();
    buscarTransacoes();
  }, []);

  // Valida os dados antes de salvar a transação
  function validar() {
    if (!descricao || !valor || !tipo || !categoriaId || !pessoaId) {
      alert("Preencha todos os campos");
      return false;
    }

    return true;
  }

  // Envia uma nova transação para ser salva
  function salvarTransacao() {

    const valorTransacao = Number(valor);

    // Verifica se o valor foi preenchido corretamente
    if (valorTransacao < 0 || valor === "") {
      alert("É necessário preencher o valor corretamente!");
      return;
    }

    if (!validar()) return;

    fetch("http://localhost:5232/api/transacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        descricao,
        valor: Number(valor),
        tipo,
        idPessoa: Number(pessoaId),
        idCategoria: Number(categoriaId)
      })
    }).then(() => {
      setDescricao("");
      setValor("");
      setTipo("");
      setCategoriaId("");
      setPessoaId("");
      buscarTransacoes();
    });
  }

  // Volta para a tela principal
  function voltarMenu() {
    navigate("/");
  }

  return (
    <div className="containerTransacoes">
      <button className="botaoVoltar" onClick={voltarMenu}>Voltar</button>
      <h2>Cadastro de Transações</h2>

      <div className="formTransacoes">
        <label>
          Descrição:
          <input type="text"
            placeholder="Digite a descrição"
            maxLength={400}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)} />
        </label>

        <label>
          Valor:
          <input type="number"
            placeholder="Digite o valor"
            min="0"
            value={valor}
            onChange={(e) => setValor(e.target.value)} />
        </label>

        <label>
          Pessoa:
          <select value={pessoaId} onChange={(e) => setPessoaId(e.target.value)}>
            <option value="" disabled hidden>Selecione</option>
            {pessoas.map(p => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </label>

        <label>
          Finalidade:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="" disabled hidden>Selecione</option>
            <option value="despesa">Despesa</option>
            {pessoaSelecionada?.idade >= 18 && (
              <option value="receita">Receita</option>
            )}
          </select>
        </label>

        <label>
          Categoria:
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
            <option value="" disabled hidden>Selecione</option>

            {categoriasFiltradas.map(c => (
              <option key={c.id} value={c.id}>
                {c.descricao}
              </option>
            ))}

          </select>
        </label>

        <button onClick={salvarTransacao}>Salvar</button>
      </div>

      <h3>Lista de Transações</h3>
      <ul className="listaPessoas">
        {transacoes.map(t => {
          const pessoa = pessoas.find(p => p.id == t.idPessoa);
          return (
            <li key={t.id}>
              {t.descricao} - R$ {t.valor} - {t.tipo} - {pessoa?.nome}
            </li>
          );
        })}
      </ul>
    </div>
  );
}