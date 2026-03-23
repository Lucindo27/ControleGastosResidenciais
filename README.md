# Controle de Gastos Residenciais

## Descrição
Solução fullstack com backend em C#/.NET e frontend em React com TypeScript, desevolvido para gerenciar gastos residenciais.
O sistema permite cadastro de pessoas, categorias e transações financeiras, além de consultas de totais por pessoas.

## Tecnologias utilizadas
**Backend:** C# com .NET (WebAPI)
**Frontend:** React + TypeScript
**Persistência:** SQL Server
**Ferramentas:** Git, Visual Studio, VSCode e SQL Server Management Studio

Estrutura do Projeto
```text
├── backend/Controllers     # WebAPI em .NET
│   ├── Data/               # Persistência de dados
│   │   └── Script.sql     # Script para criação do banco e suas respectivas tabelas
│   ├── Models/             # Modelos de dados
│   ├── Services/           # Lógica de negócio
│   └──                     # Endpoints da API
│
├── frontend/           # Frontend em React + TypeScript
│   ├── src/
│   │   ├── pages/      # Telas do sistema
│   │   ├── App.css     # Estilização das telas
│   │   └── App.tsx
└── └── package.json
```

## Como Executar o projeto

### 1. Configurar o banco de dados
1. Acesse a pasta `backend/Data`
2. Abra o arquivo `Script.sql`
3. Copie e execute o script no seu SQL Server para criar as tabelas e dados iniciais

### 2. Rodar o backend
Só rodar o projeto no Visual Studio (Ctrl + F5) após criar o banco com Script.sql

### 3. Rodar o frontend
1. Clique com o botão direito na pasta `frontend` e selecione **"Open in Integrated Terminal"** no VSCode.  
2. No terminal aberto, execute o comando:
```bash
npm run dev
