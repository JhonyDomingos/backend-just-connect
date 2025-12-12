# 🚀 JustConnect - Backend API

API RESTful para a plataforma JustConnect, uma rede social focada em conectar profissionais e compartilhar conhecimento.

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748.svg)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📋 Índice

- [Sobre](#-sobre)
- [Documentação](#-documentação)
- [Quick Start](#-quick-start)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 📖 Sobre

JustConnect é uma plataforma social profissional que conecta pessoas através de conhecimento compartilhado. Esta é a API backend construída com Node.js, TypeScript, Express e Prisma.

### Principais Recursos

- ✨ Autenticação JWT
- 👥 Gestão de usuários e perfis
- 📝 Sistema de posts e comentários
- 🔒 Controle de permissões granular
- 📊 Validação robusta com Zod
- 🗄️ PostgreSQL com Prisma ORM
- 📚 Documentação Swagger interativa

---

## 📚 Documentação

A documentação completa está organizada em módulos:

### Guias de Início

- 📦 **[Instalação](docs/installation.md)** - Como configurar o projeto
- 🛠️ **[Scripts Disponíveis](docs/scripts.md)** - Todos os comandos npm
- 🤝 **[Guia de Contribuição](docs/contributing.md)** - Como contribuir

### Documentação Técnica

- 🔒 **[Middlewares](docs/middleware-documentation.md)** - Documentação de middlewares
- 📁 **[Estrutura do Projeto](docs/project-structure.md)** - Organização de arquivos
- 🔄 **[Versionamento](docs/versioning-and-release.md)** - Sistema de releases

### API

- 🌐 **Swagger**: `http://localhost:3000/api-docs`

---

## ⚡ Quick Start

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/backend-just-connect.git
cd backend-just-connect

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env

# 4. Inicie o banco de dados
npm run docker:up

# 5. Execute as migrações
npm run migrate:dev

# 6. Inicie o servidor
npm run dev
```

O servidor estará disponível em:

- 🌐 API: http://localhost:3000
- 📚 Docs: http://localhost:3000/api-docs

📖 **[Guia completo de instalação](docs/installation.md)**

---

## 🛠️ Tecnologias

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
      <br>Node.js
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=typescript" width="48" height="48" alt="TypeScript" />
      <br>TypeScript
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=express" width="48" height="48" alt="Express" />
      <br>Express
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=prisma" width="48" height="48" alt="Prisma" />
      <br>Prisma
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=postgres" width="48" height="48" alt="PostgreSQL" />
      <br>PostgreSQL
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=docker" width="48" height="48" alt="Docker" />
      <br>Docker
    </td>
  </tr>
</table>

### Stack Completo

- **Runtime**: Node.js 20+
- **Linguagem**: TypeScript 5+
- **Framework**: Express 5
- **ORM**: Prisma 7
- **Banco de Dados**: PostgreSQL
- **Validação**: Zod
- **Autenticação**: JWT
- **Documentação**: Swagger/OpenAPI
- **Versionamento**: Semantic Release

---

## 📁 Estrutura do Projeto

```
backend-just-connect/
├── docs/                      # 📚 Documentação
├── src/
│   ├── controllers/          # 🎮 Controladores
│   ├── services/             # 💼 Lógica de negócio
│   ├── middlewares/          # 🔒 Middlewares
│   ├── schemas/              # ✅ Validações Zod
│   ├── routes/               # 🛣️ Rotas
│   └── server.ts             # 🚀 Entry point
├── prisma/
│   ├── schema.prisma         # 📊 Schema
│   └── migrations/           # 🔄 Migrações
└── package.json
```

📖 **[Estrutura completa do projeto](docs/project-structure.md)**

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. 🍴 Fork o projeto
2. 🌿 Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit com [Conventional Commits](https://www.conventionalcommits.org/)
4. 📤 Push para a branch (`git push origin feature/AmazingFeature`)
5. 🔀 Abra um Pull Request

### Padrão de Commits

```bash
feat(users): adicionar endpoint de perfil
fix(auth): corrigir validação de token
docs: atualizar README
```

📖 **[Guia completo de contribuição](docs/contributing.md)**

---

## 📜 Scripts Principais

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run lint:fix     # Corrigir lint
npm run format       # Formatar código
npm run release      # Gerar release
```

📖 **[Todos os scripts disponíveis](docs/scripts.md)**

---

## ⚠️ Avisos Importantes

> [!IMPORTANT]  
> **Não faça commits diretos na branch `main`!**  
> Todas as alterações devem ser feitas através de Pull Requests.

> [!NOTE]  
> Este projeto utiliza **Conventional Commits** e **Semantic Versioning**.  
> O versionamento é automático baseado nos commits.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Contribuidores do projeto
- Time de desenvolvimento JustConnect

---

## 👥 Contribuidores

### 💼 Core Team

- **Ana Clara** - [@banaclara](https://github.com/banaclara) - Backend Developer | Designer
- **Hallan Pedrosa** - [@hallanpf](https://github.com/hallanpf) - Backend Developer
- **Guilherme Medeiros** - [@guimferreira](https://github.com/guimferreira) - Backend Developer
- **Gabriel Marques** - [@gazinmarks](https://github.com/gazinmarks) - Backend Developer
- **Jhonatan Domingos** - [@JhonyDomingos](https://github.com/JhonyDomingos) - Backend Developer

### 🤝 Contribuidores

- **Clara Ferraz** - [@claraferraz](https://github.com/claraferraz) - Front | Scrum Master | BOSS

---

<div align="center">

**Feito com ❤️ pelo time JustConnect**

[⬆ Voltar ao topo](#-justconnect---backend-api)

</div>
