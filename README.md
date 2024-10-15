# Projeto JustConnect - Guia de Instalação

## Avisos

> [!IMPORTANT]  
> Por favor, não faça commit direto na branch main.  
> Abaixo está um padrão de commits semânticos para melhor identificação das alterações realizadas.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em seu sistema operacional. Você pode instalá-los a partir do [Site Oficial](https://nodejs.org/).

## Passos de Instalação

1. **Fork do repositório**

2. **Clone o repositório:**

   ```bash
    git clone https://github.com/seu-usuario/justconnect.git
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

Este comando iniciará o servidor de desenvolvimento local. Você pode acessar sua aplicação em <http://localhost:3000/> (ou outra porta especificada na sua configuração).

## Padrão de Commits a Serem Seguidos

Evite fazer commits de grandes quantidades de código de uma só vez; às vezes, menos é mais. Também siga esses padrões de descrição de commits para facilitar a leitura e compreensão das alterações feitas:

## Padrão de Commits a Serem Seguidos

Evite fazer commits de grandes quantidades de código de uma só vez; às vezes, menos é mais. Também siga esses padrões de descrição de commits para facilitar a leitura e compreensão das alterações feitas:

- **Feat:** Addition of a new feature.
  - **Exemplo:**

    ```bash
    git commit -m "Feat: Create AuthUser"
    ```

- **Fix:** Correction of logic in a feature, tests, etc.
  - **Exemplo:**

    ```bash
    git commit -m "Fix: Correct user login error"
    ```

- **Refactor:** Refactoring and/or optimization of code, correcting indentation, etc.
  - **Exemplo:**

    ```bash
    git commit -m "Refactor: Clean up authentication logic"
    ```

- **Style:** Addition and modification of styling (ONLY STYLING).
  - **Exemplo:**

    ```bash
    git commit -m "Style: Update API response format"
    ```

- **Chore:** Chore commits indicate updates to build tasks, admin configurations, packages, etc. (does not include code changes).
  - **Exemplo:**

    ```bash
    git commit -m "Chore: Update dependencies in package.json"
    ```

- **Docs:** Addition of documentation to the project.
  - **Exemplo:**

    ```bash
    git commit -m "Docs: Add API documentation"
    ```

## Pull Requests

Ao criar um pull request, verifique se não há conflitos. **Pull requests com conflitos não serão aceitos.**

Se houver conflitos, pesquise sobre como resolvê-los em projetos open-source.

## Branches

- **main:** -> Main branch.
- **developer:** -> Development branch.
- **build:** -> Branch for architecture and other dependencies.
- **feature:** -> Branch for new features.
- **docs:** -> Branch for internal documentation.

**Para acessar e navegar entre as branches:**

```bash
git checkout nome_da_branch   # para trocar de branch
git checkout -b nome_da_branch # para criar uma nova branch
