# 📁 Estrutura do Projeto

Visão detalhada da organização de arquivos e pastas do projeto.

---

## Árvore de Diretórios

```
backend-just-connect/
├── .github/                   # Configurações GitHub
│   ├── workflows/            # GitHub Actions
│   └── pull_request_template.md
├── docs/                      # 📚 Documentação
│   ├── contributing.md
│   ├── installation.md
│   ├── middleware-documentation.md
│   ├── project-structure.md
│   ├── scripts.md
│   └── versioning-and-release.md
├── prisma/                    # 🗄️ Prisma ORM
│   ├── migrations/           # Migrações do banco
│   └── schema.prisma         # Schema do banco
├── src/                       # 📦 Código fonte
│   ├── @types/               # Tipos TypeScript customizados
│   ├── controllers/          # 🎮 Controladores
│   ├── services/             # 💼 Lógica de negócio
│   ├── middlewares/          # 🔒 Middlewares
│   ├── schemas/              # ✅ Validações Zod
│   ├── interfaces/           # 📋 Interfaces TypeScript
│   ├── routes/               # 🛣️ Rotas da API
│   ├── prisma/               # Cliente Prisma
│   ├── log/                  # 📝 Sistema de logs
│   ├── Error/                # ⚠️ Tratamento de erros
│   ├── utils/                # 🛠️ Funções auxiliares
│   ├── swagger.ts            # Geração Swagger
│   └── server.ts             # 🚀 Entry point
├── .env                       # Variáveis de ambiente
├── .env.example              # Template de variáveis
├── .gitignore                # Arquivos ignorados
├── .prettierrc               # Config Prettier
├── .releaserc.json           # Config Semantic Release
├── docker-compose.yml        # 🐳 Docker Compose
├── eslint.config.mjs         # Config ESLint
├── package.json              # Dependências npm
├── tsconfig.json             # Config TypeScript
└── README.md                 # Documentação principal
```

---

## Descrição das Pastas

### `src/controllers/`

Controladores que recebem requisições HTTP e retornam respostas.

**Estrutura:**

```
controllers/
├── auth/
│   └── AuthController.ts
├── user/
│   ├── CreateUserController.ts
│   ├── GetUserController.ts
│   └── UpdateUserController.ts
├── posts/
│   └── ...
└── comments/
    └── ...
```

**Exemplo:**

```typescript
class CreateUserController {
  handle = asyncHandler(async (req: Request, res: Response) => {
    const service = new CreateUserService();
    const result = await service.execute(req.body);
    return res.status(201).json(result);
  });
}
```

---

### `src/services/`

Lógica de negócio e regras da aplicação.

**Estrutura:**

```
services/
├── user/
│   ├── CreateUserService.ts
│   ├── GetUserService.ts
│   └── UpdateUserService.ts
├── auth/
│   └── AuthService.ts
└── ...
```

**Exemplo:**

```typescript
class CreateUserService {
  async execute(data: CreateUserData): Promise<User> {
    // Validação
    // Lógica de negócio
    // Persistência
    return user;
  }
}
```

---

### `src/middlewares/`

Middlewares para autenticação, validação, etc.

**Estrutura:**

```
middlewares/
├── auth/
│   └── Auth.middleware.ts
├── ensure/
│   └── ensure.middleware.ts
├── Permissions/
│   └── Permission.middleware.ts
└── handleErrors/
    └── HandleErrors.middleware.ts
```

**Tipos de middleware:**

- `Auth.middleware.ts` - Autenticação JWT
- `ensure.middleware.ts` - Validações (username único, etc)
- `Permission.middleware.ts` - Autorização
- `HandleErrors.middleware.ts` - Tratamento de erros

---

### `src/schemas/`

Schemas Zod para validação de dados.

**Estrutura:**

```
schemas/
├── userSchemas.ts
├── postSchemas.ts
├── commentSchemas.ts
└── authSchemas.ts
```

**Exemplo:**

```typescript
export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});
```

---

### `src/interfaces/`

Interfaces e tipos TypeScript.

**Estrutura:**

```
interfaces/
├── user/
│   └── UserTypes.ts
├── auth/
│   └── AuthTypes.ts
└── ...
```

**Exemplo:**

```typescript
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}
```

---

### `src/routes/`

Definição de rotas da API.

**Estrutura:**

```
routes/
├── index.routes.ts           # Rota principal
├── user.routes.ts
├── auth.routes.ts
├── posts.routes.ts
└── comments.routes.ts
```

**Exemplo:**

```typescript
const userRoutes = Router();

userRoutes.post("/users", authMiddleware, new CreateUserController().handle);
```

---

### `src/Error/`

Classes de erro customizadas.

**Estrutura:**

```
Error/
├── AppError.error.ts
└── Enums/
    └── AuthMessage.enum.ts
```

**Exemplo:**

```typescript
export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

---

### `src/log/`

Sistema de logging.

**Estrutura:**

```
log/
└── logger.ts
```

**Funcionalidades:**

- Logs coloridos no console
- Níveis: info, success, warn, error
- Timestamps automáticos

---

### `prisma/`

Configuração do Prisma ORM.

**Estrutura:**

```
prisma/
├── schema.prisma             # Schema do banco
└── migrations/               # Histórico de migrações
    ├── 20240101_init/
    ├── 20240102_add_users/
    └── migration_lock.toml
```

---

### `docs/`

Documentação do projeto.

**Arquivos:**

- `contributing.md` - Guia de contribuição
- `installation.md` - Guia de instalação
- `middleware-documentation.md` - Docs de middlewares
- `project-structure.md` - Este arquivo
- `scripts.md` - Documentação dos scripts
- `versioning-and-release.md` - Versionamento

---

## Convenções de Nomenclatura

### Arquivos

```
PascalCase:
- CreateUserController.ts
- AuthService.ts
- AppError.error.ts

camelCase:
- userSchemas.ts
- authRoutes.ts

kebab-case:
- middleware-documentation.md
```

### Classes e Interfaces

```typescript
// PascalCase
class CreateUserService {}
interface UserData {}

// camelCase para instâncias
const createUserService = new CreateUserService();
```

### Constantes e Enums

```typescript
// UPPER_SNAKE_CASE
const MAX_LOGIN_ATTEMPTS = 5;

// PascalCase para Enums
enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
```

---

## Fluxo de uma Requisição

```
1. Request HTTP
   ↓
2. Route (src/routes/)
   ↓
3. Middleware (auth, validation)
   ↓
4. Controller (src/controllers/)
   ↓
5. Service (src/services/)
   ↓
6. Prisma Client (src/prisma/)
   ↓
7. Database (PostgreSQL)
   ↓
8. Response HTTP
```

---

## Adicionando Novos Módulos

### Exemplo: Adicionar módulo "Posts"

```bash
# 1. Criar estrutura
mkdir -p src/controllers/posts
mkdir -p src/services/posts
mkdir -p src/interfaces/posts

# 2. Criar arquivos
touch src/controllers/posts/CreatePostController.ts
touch src/services/posts/CreatePostService.ts
touch src/interfaces/posts/PostTypes.ts
touch src/schemas/postSchemas.ts
touch src/routes/posts.routes.ts

# 3. Atualizar schema Prisma
# prisma/schema.prisma

# 4. Criar migração
npm run migrate:dev
```

---

[← Voltar ao README](../README.md)
