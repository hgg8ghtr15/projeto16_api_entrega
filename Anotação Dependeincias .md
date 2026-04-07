# Anotacoes de Gerenciamento de Dependencias

Este arquivo resume os principais conceitos e comandos usados para gerenciar dependencias em projetos Node.js com `npm`.

O projeto atual usa como exemplo:
- `express`
- `jsonwebtoken`

## Estrutura Basica do Projeto

Ao iniciar um projeto Node.js, alguns arquivos e pastas passam a ser importantes:

### `package.json`
Arquivo principal de configuracao do projeto. Ele guarda:
- nome e versao do projeto
- scripts
- dependencias
- dependencias de desenvolvimento

Exemplo deste projeto:

```json
"dependencies": {
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3"
}
```

### `package-lock.json`
Arquivo gerado automaticamente pelo `npm` para registrar exatamente quais versoes foram instaladas.

Ele ajuda a:
- manter instalacoes consistentes entre maquinas
- evitar diferencas inesperadas entre ambientes
- garantir mais previsibilidade no projeto

### `node_modules/`
Pasta onde os pacotes instalados ficam armazenados localmente.

Normalmente:
- nao deve ser editada manualmente
- nao deve ser enviada para o Git
- pode ser recriada com `npm install`

## Inicializacao do Projeto

### Criar um `package.json`
```bash
npm init -y
```

Cria um `package.json` com valores padrao, sem perguntas interativas.

## Instalacao de Dependencias

### Instalar um pacote
```bash
npm install express
```

Instala o pacote e adiciona em `"dependencies"` no `package.json`.

### Instalar uma versao especifica
```bash
npm install express@5.0.0
```

Instala exatamente a versao informada.

### Instalar todas as dependencias do projeto
```bash
npm install
```

Le o `package.json` e o `package-lock.json` para instalar tudo o que o projeto precisa.

### Instalar dependencia de desenvolvimento
```bash
npm install nodemon -D
```

Ou:

```bash
npm install nodemon --save-dev
```

Esses pacotes vao para `"devDependencies"` e costumam ser usados apenas durante o desenvolvimento.

## Dependencias vs DevDependencies

### `dependencies`
Pacotes necessarios para a aplicacao funcionar em producao.

Exemplos:
- `express`
- `jsonwebtoken`

### `devDependencies`
Pacotes usados no desenvolvimento, testes, lint ou automacao.

Exemplos:
- `nodemon`
- `eslint`
- `jest`

## Removendo Pacotes

### Desinstalar um pacote
```bash
npm uninstall express
```

Remove o pacote de:
- `node_modules`
- `package.json`
- `package-lock.json`

## Instalando sem alterar a versao automaticamente

### Salvar versao exata
```bash
npm install express --save-exact
```

Isso salva a versao sem o `^`, por exemplo:

```json
"express": "5.2.1"
```

## Verificacao de Pacotes Instalados

### Listar dependencias instaladas
```bash
npm list
```

### Listar apenas um pacote
```bash
npm list express
```

### Ver pacotes desatualizados
```bash
npm outdated
```

Ou o atalho:

```bash
npm out
```

Se nao retornar nada, normalmente significa que nao ha atualizacoes pendentes dentro do contexto avaliado pelo `npm`.

## Atualizacao de Dependencias

### Atualizar pacotes respeitando a faixa de versao
```bash
npm update
```

Esse comando atualiza os pacotes dentro do limite permitido no `package.json`.

Exemplo:
- se estiver `^5.2.1`, ele pode atualizar para `5.3.0`
- se estiver `~5.2.1`, ele pode atualizar para `5.2.9`

### Ver o que mudou depois da atualizacao
Depois de atualizar, vale conferir:
- `package.json`
- `package-lock.json`
- funcionamento da aplicacao

## Entendendo Versionamento Semantico

Versoes costumam seguir o formato:

```text
MAJOR.MINOR.PATCH
```

Exemplo:

```text
5.2.1
```

Significado:
- `MAJOR`: mudancas grandes, possivelmente quebrando compatibilidade
- `MINOR`: novas funcionalidades sem quebrar compatibilidade
- `PATCH`: correcoes e pequenos ajustes

## Simbolos de Versao no `package.json`

### `^`
Exemplo:

```json
"express": "^5.2.1"
```

Permite atualizar:
- `MINOR`
- `PATCH`

Nao permite mudar automaticamente para a proxima `MAJOR`.

### `~`
Exemplo:

```json
"express": "~5.2.1"
```

Permite atualizar apenas:
- `PATCH`

### Sem simbolo
Exemplo:

```json
"express": "5.2.1"
```

Mantem exatamente a versao definida.

## Utilizando o `npm-check-updates` (NCU)

O `npm-check-updates` e uma ferramenta util para atualizar as versoes escritas no `package.json`, inclusive quando existe uma nova versao major.

### Verificar atualizacoes disponiveis
```bash
npx npm-check-updates
```

### Atualizar o `package.json`
```bash
npx npm-check-updates -u
```

Importante:
- esse comando altera o `package.json`
- ele nao instala os pacotes sozinho

Depois disso, rode:

```bash
npm install
```

### Modo interativo
```bash
npx npm-check-updates --interactive --format group
```

Permite escolher quais pacotes atualizar, agrupando por tipo de mudanca:
- `major`
- `minor`
- `patch`

## Fluxo Recomendado para Atualizar Dependencias

Um fluxo seguro costuma ser:

1. Rodar `npm outdated`
2. Avaliar impacto das atualizacoes
3. Rodar `npm update` ou `npx npm-check-updates -u`
4. Rodar `npm install`
5. Testar a aplicacao
6. Revisar mudancas no `package-lock.json`

## Boas Praticas

- Entenda a diferenca entre `dependencies` e `devDependencies`
- Prefira atualizar com cuidado, principalmente em mudancas `major`
- Sempre teste a aplicacao depois de atualizar pacotes importantes
- Nao apague `package-lock.json` sem necessidade
- Evite editar `node_modules` manualmente
- Revise changelogs quando atualizar bibliotecas centrais

## Resumo Rapido

### Criar projeto
```bash
npm init -y
```

### Instalar pacote
```bash
npm install nome-do-pacote
```

### Instalar dependencia de desenvolvimento
```bash
npm install nome-do-pacote -D
```

### Instalar tudo novamente
```bash
npm install
```

### Remover pacote
```bash
npm uninstall nome-do-pacote
```

### Ver desatualizados
```bash
npm outdated
```

### Atualizar dentro da faixa permitida
```bash
npm update
```

### Atualizar `package.json` com NCU
```bash
npx npm-check-updates -u
```
