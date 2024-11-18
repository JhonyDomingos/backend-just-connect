# Middleware de Permissões

Middleware responsável por gerenciar as permissões de acesso aos posts da aplicação.

## Funcionalidades

### 1. Verificação de Edição (`canEditPost`)

- **Descrição**: Verifica se o usuário tem permissão para editar um post específico
- **Permissão**: Apenas o autor do post pode editar
- **Erros**:
  - `404`: Post não encontrado
  - `403`: Usuário sem permissão para editar

### 2. Verificação de Administração (`canAdministerPost`)

- **Descrição**: Verifica se o usuário tem permissão para administrar (deletar) um post
- **Permissão**: Autor do post ou usuário com role ADMIN
- **Erros**:
  - `404`: Post não encontrado
  - `403`: Usuário sem permissão para deletar

## Como Usar

```typescript
import { permissionsMiddleware } from "../middlewares/PermissionsMiddleware";

// Rota para edição de post (apenas autor)
router.put(
  "/posts/:id",
  permissionsMiddleware.canEditPost,
  updatePostController
);

// Rota para deleção de post (autor ou admin)
router.delete(
  "/posts/:id",
  permissionsMiddleware.canAdministerPost,
  deletePostController
);
```

## Estrutura do Token

O middleware espera que o token decodificado contenha:

```typescript
{
  sub: string; // ID do usuário
  role: string; // Role do usuário (para verificar se é ADMIN)
}
```

## Exemplos de Uso

### Edição de Post

```typescript
// Apenas o autor pode editar
router.put(
  "/posts/:id",
  authMiddleware,
  permissionsMiddleware.canEditPost,
  updatePostController
);
```

### Deleção de Post

```typescript
// Autor ou ADMIN podem deletar
router.delete(
  "/posts/:id",
  authMiddleware,
  permissionsMiddleware.canAdministerPost,
  deletePostController
);
```

## Tratamento de Erros

O middleware utiliza o `AppError` para tratamento de exceções:

```typescript
// Exemplo de erro quando post não existe
throw new AppError("Post não encontrado.", 404);

// Exemplo de erro quando usuário não tem permissão
throw new AppError("Você não tem permissão para editar este post.", 403);
```

## Fluxo de Verificação

### canEditPost

1. Extrai userId do token
2. Busca o post pelo ID
3. Verifica se o usuário é o autor
4. Permite ou nega acesso

### canAdministerPost

1. Extrai userId e role do token
2. Busca o post pelo ID
3. Verifica se o usuário é autor ou admin
4. Permite ou nega acesso

## Considerações de Segurança

- O middleware assume que a autenticação já foi realizada
- Verifica sempre a existência do post antes de checar permissões
- Utiliza comparação estrita (===) para verificações de ID
- Converte role para uppercase para comparação case-insensitive
