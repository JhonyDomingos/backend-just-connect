# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o JustConnect! Este guia vai te ajudar a começar.

---

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Padrão de Commits](#padrão-de-commits)
- [Estrutura de Branches](#estrutura-de-branches)
- [Pull Requests](#pull-requests)
- [Code Review](#code-review)
- [Boas Práticas](#boas-práticas)

---

## Como Contribuir

### 1. Fork o Projeto

```bash
# Clique em "Fork" no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/backend-just-connect.git
cd backend-just-connect
```

### 2. Configure o Upstream

```bash
git remote add upstream https://github.com/original-repo/backend-just-connect.git
git fetch upstream
```

### 3. Mantenha seu Fork Atualizado

```bash
git checkout main
git pull upstream main
git push origin main
```

---

## Padrão de Commits

Seguimos **[Conventional Commits](https://www.conventionalcommits.org/)**.

### Estrutura

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos Aceitos

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat(auth): adicionar login JWT` |
| `fix` | Correção de bug | `fix(users): corrigir validação email` |
| `docs` | Documentação | `docs: atualizar README` |
| `style` | Formatação | `style: corrigir indentação` |
| `refactor` | Refatoração | `refactor: reorganizar services` |
| `perf` | Performance | `perf: otimizar query banco` |
| `test` | Testes | `test: adicionar testes users` |
| `chore` | Manutenção | `chore: atualizar dependências` |

### Exemplos Completos

```bash
# Feature com breaking change
git commit -m "feat(api)!: migrar para Express v5

BREAKING CHANGE: Express v4 não é mais suportado.
Middlewares precisam ser atualizados."

# Fix simples
git commit -m "fix(auth): corrigir validação de token expirado"

# Múltiplas linhas
git commit -m "feat(posts): adicionar criação de posts

- Implementa endpoint POST /posts
- Adiciona validação Zod
- Adiciona middleware de auth"
```

---

## Estrutura de Branches

```
main                → Produção (protegida)
  └── develop       → Desenvolvimento
       ├── feature/nome-da-feature
       ├── fix/nome-do-bug
       ├── refactor/nome-da-refatoracao
       └── docs/nome-da-documentacao
```

### Nomenclatura de Branches

```bash
# Features
git checkout -b feature/add-user-profile
git checkout -b feature/implement-comments

# Fixes
git checkout -b fix/user-validation
git checkout -b fix/memory-leak

# Refactors
git checkout -b refactor/user-service
git checkout -b refactor/database-queries

# Docs
git checkout -b docs/update-readme
git checkout -b docs/add-api-examples
```

---

## Pull Requests

### Antes de Criar o PR

✅ Checklist:

- [ ] Código segue os padrões do projeto
- [ ] Commits seguem Conventional Commits
- [ ] Todos os testes passam
- [ ] Lint sem erros (`npm run lint`)
- [ ] Código formatado (`npm run format`)
- [ ] Sem conflitos com a branch base
- [ ] Documentação atualizada (se necessário)

### Criando o PR

1. **Push da branch:**
```bash
git push origin feature/minha-feature
```

2. **Abra o PR no GitHub:**
- Título: Use o padrão de commit (`feat: adicionar feature X`)
- Preencha o template completo
- Adicione labels apropriadas
- Solicite reviewers

### Template do PR

O template será preenchido automaticamente. Certifique-se de:

- [ ] Marcar o tipo de mudança
- [ ] Descrever o que foi feito
- [ ] Linkar issues relacionadas
- [ ] Preencher o checklist
- [ ] Adicionar screenshots (se UI)

---

## Code Review

### Para Reviewers

#### O que revisar:

- ✅ Código segue os padrões do projeto
- ✅ Lógica de negócio está correta
- ✅ Sem vulnerabilidades de segurança
- ✅ Validações adequadas
- ✅ Tratamento de erros
- ✅ Performance aceitável
- ✅ Testes cobrem casos importantes
- ✅ Documentação clara

#### Como revisar:

```bash
# Fazer checkout da branch do PR
gh pr checkout 123

# Rodar localmente
npm install
npm run dev

# Testar as mudanças
npm run lint
npm run format:check
```

### Para Contribuidores

#### Respondendo a reviews:

- ✅ Agradeça o feedback
- ✅ Faça as mudanças solicitadas
- ✅ Explique decisões técnicas se necessário
- ✅ Peça esclarecimentos se não entender
- ✅ Marque como resolvido após implementar

---

## Boas Práticas

### ✅ DO (Faça)

```bash
# Commits pequenos e focados
git commit -m "feat(auth): adicionar middleware JWT"
git commit -m "test(auth): adicionar testes middleware"

# Pull antes de push
git pull origin main
git push origin feature/minha-feature

# Testar antes de commitar
npm run lint
npm run format
npm run build
```

### ❌ DON'T (Não Faça)

```bash
# Commits genéricos
git commit -m "fix bug"
git commit -m "update code"

# Commits enormes
git commit -m "feat: adicionar toda a autenticação, posts, comentários e perfil"

# Force push em branches compartilhadas
git push -f origin main  # NUNCA!
```

---

## Workflow Completo

```bash
# 1. Atualizar main
git checkout main
git pull upstream main

# 2. Criar branch
git checkout -b feature/nova-funcionalidade

# 3. Fazer mudanças e commits
git add .
git commit -m "feat(users): adicionar endpoint de perfil"

# 4. Manter atualizado
git fetch upstream
git rebase upstream/main

# 5. Push e PR
git push origin feature/nova-funcionalidade
gh pr create --title "feat: nova funcionalidade" --body "Descrição"

# 6. Após aprovação, squash merge
# (feito pelo mantenedor via GitHub)
```

---

## Padrões de Código

### TypeScript

```typescript
// ✅ BOM
interface User {
  id: string;
  name: string;
  email: string;
}

async function createUser(data: CreateUserData): Promise<User> {
  // ...
}

// ❌ RUIM
async function createUser(data: any): Promise<any> {
  // ...
}
```

### Validação com Zod

```typescript
// ✅ BOM
const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

// ❌ RUIM
// Sem validação
```

### Tratamento de Erros

```typescript
// ✅ BOM
try {
  const user = await prisma.user.create({ data });
  logger.success("User created", { userId: user.id });
  return user;
} catch (error) {
  logger.error("Failed to create user", { error });
  throw new AppError("Erro ao criar usuário", 500);
}

// ❌ RUIM
const user = await prisma.user.create({ data });
return user;
```

---

## Recursos Úteis

- 📖 [Conventional Commits](https://www.conventionalcommits.org/)
- 📖 [Semantic Versioning](https://semver.org/)
- 📖 [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- 📖 [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

---

## Precisa de Ajuda?

- 💬 Abra uma [Discussion](https://github.com/repo/discussions)
- 🐛 Reporte um [Bug](https://github.com/repo/issues/new?template=bug_report.md)
- 💡 Sugira uma [Feature](https://github.com/repo/issues/new?template=feature_request.md)

---

**Obrigado por contribuir! 🎉**

[← Voltar ao README](../README.md)