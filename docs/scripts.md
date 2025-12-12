# 🛠️ Scripts Disponíveis

## Desenvolvimento

### `npm run dev`

Inicia o servidor em modo watch (desenvolvimento).

- Hot reload automático
- Logs coloridos no console
- Porta padrão: 3000

```bash
npm run dev
```

### `npm run dev:debug`

Inicia o servidor com debugger Node.js habilitado.

```bash
npm run dev:debug
```

Depois conecte seu debugger na porta `9229`.

---

## Build e Produção

### `npm run build`

Compila TypeScript para JavaScript na pasta `dist/`.

```bash
npm run build
```

### `npm run start:prod`

Inicia o servidor compilado (produção).

```bash
npm run build
npm run start:prod
```

---

## Banco de Dados

### `npm run docker:up`

Inicia o container PostgreSQL via Docker Compose.

```bash
npm run docker:up
```

### `npm run migrate:dev`

Executa migrações do Prisma em ambiente de desenvolvimento.

```bash
npm run migrate:dev
```

### `npm run studio`

Abre o Prisma Studio (interface visual do banco).

```bash
npm run studio
```

Acesse: `http://localhost:5555`

### `npm run generate`

Gera o Prisma Client baseado no schema.

```bash
npm run generate
```

---

## Documentação e Release

### `npm run swagger`

Gera a documentação Swagger/OpenAPI.

```bash
npm run swagger
```

### `npm run release`

Executa release automático (Semantic Release).

```bash
npm run release
```

⚠️ **Atenção:** Apenas execute na branch `main` após merge de PRs.

### `npm run release:dry`

Testa o release sem publicar (dry-run).

```bash
npm run release:dry
```

---

## Scripts Úteis para CI/CD

```bash
# Pipeline completa
npm ci                  # Instala dependências (CI)
npm run format:check   # Verifica formatação
npm run build          # Compila
npm run migrate:deploy # Migração em produção
npm run start:prod     # Inicia servidor
```

---

## Atalhos Personalizados

Adicione no seu `package.json`:

```json
{
  "scripts": {
    "setup": "npm install && npm run docker:up && npm run migrate:dev",
    "reset": "docker-compose down -v && npm run docker:up && npm run migrate:dev",
    "test:api": "npm run dev & sleep 5 && curl http://localhost:3000/health"
  }
}
```

**Uso:**

```bash
# Configuração inicial completa
npm run setup

# Reset completo do banco
npm run reset

# Teste rápido da API
npm run test:api
```

---

[← Voltar ao README](../README.md)
