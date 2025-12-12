# Documentação de Versionamento e Release

## Índice

1. [Visão Geral](#visão-geral)
2. [Conventional Commits](#conventional-commits)
3. [Semantic Versioning](#semantic-versioning)
4. [Configuração](#configuração)
5. [Workflow de Release](#workflow-de-release)
6. [Tipos de Commit](#tipos-de-commit)
7. [Exemplos Práticos](#exemplos-práticos)
8. [Automação CI/CD](#automação-cicd)

---

## Visão Geral

Este projeto utiliza **Semantic Release** para automação completa de versionamento e publicação de releases. O sistema analisa os commits convencionais e gera automaticamente:

- ✅ Nova versão semântica
- ✅ CHANGELOG.md atualizado
- ✅ Tag Git
- ✅ Release no GitHub
- ✅ Atualização do package.json

---

## Conventional Commits

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/) para mensagens de commit estruturadas.

### Estrutura

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Exemplo

```bash
feat(auth): adicionar autenticação JWT

Implementa sistema de autenticação usando JWT com refresh token.
Adiciona middleware de verificação de token.

BREAKING CHANGE: remove autenticação básica
```

---

## Semantic Versioning

Utilizamos [Semantic Versioning (SemVer)](https://semver.org/) no formato `MAJOR.MINOR.PATCH`:

| Versão | Quando Incrementar | Exemplo |
|--------|-------------------|---------|
| **MAJOR** | Mudanças incompatíveis na API | 1.0.0 → 2.0.0 |
| **MINOR** | Novas funcionalidades compatíveis | 1.0.0 → 1.1.0 |
| **PATCH** | Correções de bugs compatíveis | 1.0.0 → 1.0.1 |

---

## Configuração

### Arquivo `.releaserc.json`

```json
{
  "branches": ["main", "master"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

### Scripts no `package.json`

```json
{
  "scripts": {
    "release": "semantic-release",
    "release:dry": "semantic-release --dry-run"
  }
}
```

---

## Workflow de Release

### 1. Desenvolvimento em Branch

```bash
# Criar branch de feature
git checkout -b feature/nova-funcionalidade

# Fazer commits convencionais
git commit -m "feat: adicionar endpoint de usuários"
git commit -m "test: adicionar testes para UserService"
git commit -m "docs: atualizar README"
```

### 2. Pull Request e Code Review

```bash
# Criar PR para main
gh pr create --title "feat: nova funcionalidade" --body "Descrição"

# Após aprovação, fazer merge
git checkout main
git merge feature/nova-funcionalidade
```

### 3. Executar Release

```bash
# Executar release (gera versão automaticamente)
npm run release

# OU testar sem publicar
npm run release:dry
```

### 4. Resultado Automático

- ✅ Versão atualizada em `package.json`
- ✅ `CHANGELOG.md` gerado/atualizado
- ✅ Commit de release criado
- ✅ Tag Git criada (ex: `v1.2.0`)
- ✅ Release publicado no GitHub

---

## Tipos de Commit

### Regras de Versionamento

| Tipo | Versão | Descrição | Aparece no CHANGELOG |
|------|--------|-----------|---------------------|
| `feat` | **MINOR** | Nova funcionalidade | ✅ Sim |
| `fix` | **PATCH** | Correção de bug | ✅ Sim |
| `perf` | **PATCH** | Melhoria de performance | ✅ Sim |
| `refactor` | **PATCH** | Refatoração de código | ✅ Sim |
| `docs` | **PATCH** | Atualização de documentação | ✅ Sim |
| `chore` | **-** | Tarefas de manutenção | ❌ Não |
| `style` | **-** | Formatação de código | ❌ Não |
| `test` | **-** | Adição/correção de testes | ❌ Não |
| `BREAKING CHANGE` | **MAJOR** | Mudança incompatível | ✅ Sim |

### Seções no CHANGELOG

```markdown
## [1.2.0] - 2025-12-12

### ✨ Features
- nova funcionalidade X

### 🐛 Bug Fixes
- correção do bug Y

### ⚡ Performance Improvements
- otimização da query Z

### ♻️ Code Refactoring
- melhoria na estrutura W

### 📚 Documentation
- atualização do README
```

---

## Exemplos Práticos

### Exemplo 1: Adicionar Nova Feature (MINOR)

```bash
# Commit
git commit -m "feat(users): adicionar endpoint de listagem de usuários

Implementa endpoint GET /users com paginação e filtros.
Adiciona validação de query params com Zod."

# Resultado
# Versão: 1.0.0 → 1.1.0
```

### Exemplo 2: Corrigir Bug (PATCH)

```bash
# Commit
git commit -m "fix(auth): corrigir validação de token expirado

Corrige erro ao verificar tokens JWT expirados.
Adiciona tratamento específico para TokenExpiredError."

# Resultado
# Versão: 1.1.0 → 1.1.1
```

### Exemplo 3: Breaking Change (MAJOR)

```bash
# Commit
git commit -m "feat(api): migrar para Express v5

BREAKING CHANGE: atualiza Express v4 para v5.
Middlewares precisam ser atualizados para nova API."

# Resultado
# Versão: 1.1.1 → 2.0.0
```

### Exemplo 4: Múltiplos Commits

```bash
# Commits na branch
git commit -m "feat(posts): adicionar criação de posts"
git commit -m "feat(posts): adicionar edição de posts"
git commit -m "fix(posts): corrigir validação de título"
git commit -m "test(posts): adicionar testes unitários"
git commit -m "docs: atualizar documentação da API"

# Após merge e release
# Versão: 2.0.0 → 2.1.0
# (2 features = MINOR, fix/test/docs não mudam)
```

---

## Automação CI/CD

### GitHub Actions

Crie `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npm run release
```

### GitLab CI

Crie `.gitlab-ci.yml`:

```yaml
release:
  stage: deploy
  only:
    - main
  script:
    - npm ci
    - npm run release
  variables:
    GITLAB_TOKEN: $CI_JOB_TOKEN
```

---

## Boas Práticas

### ✅ DO

- Usar commits convencionais sempre
- Fazer commits pequenos e focados
- Descrever claramente as mudanças
- Usar scopes para organizar (`feat(auth)`, `fix(users)`)
- Documentar breaking changes no footer
- Revisar o CHANGELOG gerado

### ❌ DON'T

- Fazer commits genéricos (`fix: bug`, `chore: update`)
- Misturar múltiplas mudanças em um commit
- Fazer commits direto na main sem PR
- Esquecer de executar release após merge
- Editar manualmente `package.json` ou `CHANGELOG.md`

---

## Comandos Úteis

```bash
# Executar release
npm run release

# Testar release sem publicar
npm run release:dry

# Ver histórico de releases
git tag -l

# Ver changelog
cat CHANGELOG.md

# Reverter release (cuidado!)
git revert HEAD
git tag -d v1.2.0
git push origin :refs/tags/v1.2.0
```

---

## Troubleshooting

### Problema: "No release found"

**Causa:** Nenhum commit relevante desde a última release.

**Solução:** Certifique-se de usar tipos que geram release (`feat`, `fix`, etc.).

### Problema: "Not running in a known CI environment"

**Causa:** Executando localmente sem `--no-ci`.

**Solução:** 
```bash
npm run release -- --no-ci
```

### Problema: "Branch not configured"

**Causa:** Branch atual não está em `.releaserc.json`.

**Solução:** Fazer merge para `main` ou adicionar branch na configuração.

### Problema: Release duplicada

**Causa:** Executou `npm run release` múltiplas vezes.

**Solução:** Semantic Release previne isso automaticamente com tags Git.

---

## Referências

- [Semantic Release](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

## Suporte

Para dúvidas ou problemas:

1. Consulte a documentação oficial
2. Verifique as issues do projeto
3. Entre em contato com a equipe de desenvolvimento

---

**Última atualização:** 2025-12-12  
**Versão do documento:** 1.0.0