# 🚀 JustConnect - Backend API

API RESTful para a plataforma JustConnect, uma rede social focada em conectar profissionais e compartilhar conhecimento.

## 📋 Índice

- [Avisos Importantes](#-avisos-importantes)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Documentação](#-documentação)
- [Padrão de Commits](#-padrão-de-commits)
- [Versionamento](#-versionamento)
- [Estrutura de Branches](#-estrutura-de-branches)
- [Pull Requests](#-pull-requests)
- [Tecnologias](#-tecnologias)

---

## ⚠️ Avisos Importantes

> [!IMPORTANT]  
> **Não faça commits diretos na branch `main`!**  
> Todas as alterações devem ser feitas através de Pull Requests.

> [!NOTE]  
> Este projeto utiliza **Conventional Commits** e **Semantic Versioning**.  
> O versionamento é automático baseado nos commits.

---

## 📦 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0
- **Docker** e **Docker Compose**
- **Git**

Você pode instalar o Node.js através do [Site Oficial](https://nodejs.org/).

---

## 🚀 Instalação

### 1. Fork e Clone do Repositório

```bash
# Fork o repositório no GitHub

# Clone seu fork
git clone https://github.com/seu-usuario/backend-just-connect.git
cd backend-just-connect
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

### 4. Inicie o Banco de Dados (Docker)

```bash
npm run docker:up
```

### 5. Execute as Migrações

```bash
npm run migrate:dev
```

### 6. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em:
- 🌐 API: `http://localhost:3000`
- 📚 Documentação Swagger: `http://localhost:3000/api-docs`

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor em modo watch
npm run dev:debug        # Inicia servidor com debugger

# Build e Produção
npm run build            # Compila TypeScript para JavaScript
npm run start:prod       # Inicia servidor em produção

# Banco de Dados
npm run docker:up        # Inicia container PostgreSQL
npm run migrate:dev      # Executa migrações
npm run studio           # Abre Prisma Studio
npm run generate         # Gera Prisma Client

# Qualidade de Código
npm run lint             # Verifica erros de lint
npm run lint:fix         # Corrige erros de lint automaticamente
npm run format           # Formata código com Prettier
npm run format:check     # Verifica formatação

# Documentação e Release
npm run swagger          # Gera documentação Swagger
npm run release          # Executa release automático
npm run release:dry      # Testa release sem publicar
```

---

## 📚 Documentação

A documentação completa do projeto está organizada na pasta `docs/`:

- 📖 [**Middleware Documentation**](docs/middleware-documentation.md) - Documentação de todos os middlewares
- 🔄 [**Versionamento e Release**](docs/versionamento-release.md) - Sistema de versionamento automático
- 📦 [**Versioning and Release (EN)**](docs/versioning-and-release.md) - Guia completo de releases

### Documentação da API

Acesse a documentação interativa Swagger:
```
http://localhost:3000/api-docs
```

---

## 📝 Padrão de Commits

Este projeto segue o padrão **[Conventional Commits](https://www.conventionalcommits.org/)** para mensagens de commit estruturadas.

### Estrutura

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos de Commit

| Tipo | Versão | Descrição | Exemplo |
|------|--------|-----------|---------|
| `feat` | **MINOR** | Nova funcionalidade | `feat(auth): adicionar autenticação JWT` |
| `fix` | **PATCH** | Correção de bug | `fix(users): corrigir validação de email` |
| `perf` | **PATCH** | Melhoria de performance | `perf(db): otimizar query de posts` |
| `refactor` | **PATCH** | Refatoração de código | `refactor(services): reorganizar estrutura` |
| `docs` | **PATCH** | Documentação | `docs: atualizar README` |
| `style` | **-** | Formatação de código | `style: corrigir indentação` |
| `test` | **-** | Testes | `test(users): adicionar testes unitários` |
| `chore` | **-** | Tarefas de manutenção | `chore: atualizar dependências` |
| `BREAKING CHANGE` | **MAJOR** | Mudança incompatível | Ver exemplo abaixo |

### Exemplos de Commits

#### ✨ Feature (MINOR)

```bash
git commit -m "feat(posts): adicionar endpoint de criação de posts

Implementa endpoint POST /posts com validação Zod.
Adiciona middleware de autenticação."
```

#### 🐛 Bug Fix (PATCH)

```bash
git commit -m "fix(auth): corrigir validação de token expirado

Corrige erro ao verificar tokens JWT expirados.
Adiciona tratamento específico para TokenExpiredError."
```

#### 💥 Breaking Change (MAJOR)

```bash
git commit -m "feat(api): migrar para Express v5

BREAKING CHANGE: atualiza Express v4 para v5.
Middlewares precisam ser atualizados para nova API.
Remover suporte para Node.js < 20."
```

#### ♻️ Refactor (PATCH)

```bash
git commit -m "refactor(schemas): reorganizar validações Zod"
```

#### 📚 Documentation (PATCH)

```bash
git commit -m "docs: adicionar documentação de middlewares"
```

#### 🔧 Chore (SEM RELEASE)

```bash
git commit -m "chore: atualizar dependências do projeto"
```

---

## 🔄 Versionamento

Este projeto usa **Semantic Versioning** (SemVer) e **Semantic Release** para versionamento automático.

### Como Funciona

1. Commits convencionais são analisados automaticamente
2. A versão é determinada baseada nos tipos de commit:
   - `feat:` → incrementa **MINOR** (1.0.0 → 1.1.0)
   - `fix:` → incrementa **PATCH** (1.0.0 → 1.0.1)
   - `BREAKING CHANGE:` → incrementa **MAJOR** (1.0.0 → 2.0.0)
3. CHANGELOG.md é gerado/atualizado automaticamente
4. Tag Git e Release no GitHub são criados

### Fazer um Release

```bash
# Após merge na main, execute:
npm run release

# Para testar sem publicar:
npm run release:dry
```

📖 **Documentação completa:** [Versionamento e Release](docs/versioning-and-release.md)

---

## 🌿 Estrutura de Branches

```
main            → Branch de produção (protegida)
  └── develop   → Branch de desenvolvimento
       ├── feature/nome-da-feature
       ├── fix/nome-do-bug
       ├── refactor/nome-da-refatoracao
       └── docs/nome-da-documentacao
```

### Descrição das Branches

- **`main`**: Branch principal de produção. Apenas código estável e testado.
- **`develop`**: Branch de desenvolvimento. Integração de features.
- **`feature/*`**: Novas funcionalidades.
- **`fix/*`**: Correções de bugs.
- **`refactor/*`**: Refatorações e otimizações.
- **`docs/*`**: Documentação.

### Workflow de Desenvolvimento

```bash
# 1. Criar branch a partir da develop
git checkout develop
git pull origin develop
git checkout -b feature/nova-funcionalidade

# 2. Fazer commits convencionais
git add .
git commit -m "feat(users): adicionar endpoint de perfil"

# 3. Push e criar Pull Request
git push origin feature/nova-funcionalidade

# 4. Após aprovação, merge para develop
# 5. Periodicamente, merge develop → main para release
```

---

## 🔀 Pull Requests

### ✅ Checklist antes de criar PR

- [ ] Código segue os padrões do projeto
- [ ] Commits seguem Conventional Commits
- [ ] Testes passando (quando aplicável)
- [ ] Sem conflitos com a branch base
- [ ] Documentação atualizada (se necessário)
- [ ] Code review solicitado

### ❌ PRs serão rejeitados se:

- Houver conflitos não resolvidos
- Commits não seguirem o padrão
- Não passar nos testes/lint
- Modificar arquivos não relacionados

### Template de PR

Use o template em `.github/pull_request_template.md`:

```markdown
## Change Type
- [ ] Bug Fix
- [ ] New Feature
- [ ] Chore
- [ ] Release

## Description
...

## Screenshots
...

## Tasks
- [task-id](task-link) or N/A

## Checklist
- [ ] Código revisado
- [ ] Testes adicionados
- [ ] Documentação atualizada
```

---

## 🛠️ Tecnologias

### Core

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Express](https://expressjs.com/)** v5 - Framework web

### Banco de Dados

- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Prisma](https://www.prisma.io/)** - ORM moderno para Node.js
- **[@prisma/adapter-pg](https://www.prisma.io/docs/orm/overview/databases/postgresql)** - Adapter para PostgreSQL

### Validação e Segurança

- **[Zod](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hash de senhas
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - Autenticação JWT

### Documentação

- **[Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)** - Interface Swagger
- **[swagger-autogen](https://www.npmjs.com/package/swagger-autogen)** - Geração automática de docs

### Qualidade de Código

- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formatador de código
- **[typescript-eslint](https://typescript-eslint.io/)** - ESLint para TypeScript

### DevOps e Release

- **[Semantic Release](https://semantic-release.gitbook.io/)** - Automação de releases
- **[Docker](https://www.docker.com/)** - Containerização
- **[tsx](https://github.com/esbuild-kit/tsx)** - TypeScript executor

---

## 📁 Estrutura do Projeto

```
backend-just-connect/
├── docs/                      # 📚 Documentação
│   ├── middleware-documentation.md
│   ├── versionamento-release.md
│   └── versioning-and-release.md
├── src/
│   ├── controllers/          # 🎮 Controladores
│   ├── services/             # 💼 Serviços de negócio
│   ├── middlewares/          # 🔒 Middlewares
│   ├── schemas/              # ✅ Validações Zod
│   ├── interfaces/           # 📋 Interfaces TypeScript
│   ├── routes/               # 🛣️ Rotas da API
│   ├── prisma/               # 🗄️ Cliente Prisma
│   ├── log/                  # 📝 Sistema de logs
│   ├── Error/                # ⚠️ Tratamento de erros
│   └── server.ts             # 🚀 Entry point
├── prisma/
│   ├── schema.prisma         # 📊 Schema do banco
│   └── migrations/           # 🔄 Migrações
├── .github/
│   └── pull_request_template.md
├── .releaserc.json           # 🔄 Config Semantic Release
├── eslint.config.mjs         # 🔍 Config ESLint
├── tsconfig.json             # ⚙️ Config TypeScript
├── docker-compose.yml        # 🐳 Config Docker
└── package.json              # 📦 Dependências
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças usando Conventional Commits
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

📖 Leia a [documentação de versionamento](docs/versioning-and-release.md) para mais detalhes.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.


## 🙏 Agradecimentos

- Toda a comunidade open-source
- Contribuidores do projeto
- Time de desenvolvimento JustConnect

**Feito com ❤️ pelo time JustConnect**

**Última atualização:** 2025-12-12  
**Versão:** 1.0.0
