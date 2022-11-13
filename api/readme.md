# Dash API

#### Descrição
> API desenvolvido para gerir usuários

## 💻 Tecnologias

- Node.js
- Typeorm
- Docker

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você possuir o Node instalado com a versão minima 16.13.2
- Você possuir o yarn instalando em sua máquina

## 🚀 Instalando `Dash UI API`

Faça o clone do repositório

```
git clone https://github.com/thereallucas98/fullstack-crud.git
```

Instale as dependências

```
yarn
```

Executar os containers do Docker

```
sudo docker-compose up
```

Executar as migrations

```
yarn typeorm migration:run
```

### Quais são as features existentes?

- É possível cadastrar e logar no sistema;
- Para usuários:
  - É possível cadastrar um usuário;
  - É possível editar um usuário;
  - É possível deletar um usuário;
  - É possível listar usuários;
  - É possível pesquisar por um usuário;
- Para usuário logado:
  - Editar o seu nome;

### Quais são os recursos?
- Criar, editar, deletar e listar usuários cadastrados e logar com os mesmos.
