import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Relatorios() {

  const [pessoas, setPessoas] = useState<any[]>([]);
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const totalGeral = calcularTotalGeral();
  const navigate = useNavigate();

  useEffect(() => {
    // Busca as pessoas cadastradas
    fetch("http://localhost:5232/api/pessoa")
      .then(res => res.json())
      .then(setPessoas);

    // Busca as transações cadastradas
    fetch("http://localhost:5232/api/transacoes")
      .then(res => res.json())
      .then(setTransacoes);

    // Busca as categorias cadastradas
    fetch("http://localhost:5232/api/categoria")
      .then(res => res.json())
      .then(setCategorias);
  }, []);

  // Calcula receitas, despesas e saldo de uma pessoa
  function calcularTotaisPessoa(pessoaId: number) {
    const transacoesPessoa = transacoes.filter(t => t.idPessoa === pessoaId);

    let receitas = 0;
    let despesas = 0;

    // Percorre as transações da pessoa e soma os valores
    transacoesPessoa.forEach(t => {
      if (t.tipo === "receita") receitas += t.valor;
      else despesas += t.valor;
    });

    return {
      receitas,
      despesas,
      saldo: receitas - despesas
    };
  }

  // Calcula os totais gerais de todas as transações
  function calcularTotalGeral() {
    let receitas = 0;
    let despesas = 0;

    // Percorre todas as transações e soma os valores
    transacoes.forEach(t => {
      if (t.tipo === "receita") receitas += t.valor;
      else despesas += t.valor;
    });

    return {
      receitas,
      despesas,
      saldo: receitas - despesas
    };
  }

  // Volta para a tela principal
  function voltarMenu() {
    navigate("/");
  }

  return (
    <div className="containerRelatorios">

      <button className="botaoVoltar" onClick={voltarMenu}>Voltar</button>

      <h2>Relatório de Totais por Pessoa</h2>

      <table className="tabelaRelatorios">
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>

          {pessoas.map(p => {
            const total = calcularTotaisPessoa(p.id);

            return (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>R$ {total.receitas}</td>
                <td>R$ {total.despesas}</td>
                <td>R$ {total.saldo}</td>
              </tr>
            );
          })}

        </tbody>
      </table>

      <h3>Total Geral</h3>
      <table className="tabelaTotalRelatorios">
        <tbody>
          <tr>
            <td><strong>Receitas</strong></td>
            <td>R$ {totalGeral.receitas}</td>
          </tr>
          <tr>
            <td><strong>Despesas</strong></td>
            <td>R$ {totalGeral.despesas}</td>
          </tr>
          <tr>
            <td><strong>Saldo</strong></td>
            <td>R$ {totalGeral.saldo}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}