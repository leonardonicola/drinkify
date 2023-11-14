
# Drinkify

Encontre e crie receitas de drinks!


## Stacks utilizadas

- Nestjs
- Typescript
- Prisma
- AWS 
- Jest
- Husky
- Commitlint

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env. Também será necessário configurar um bucket do S3 e uma instância EC2.


`DATABASE_URL`

`JWT_SECRET`

`DB_PASSWORD`

`DB_USER`

`DB_NAME`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`S3_BUCKET`

`AWS_DEFAULT_REGION`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/leonardonicola/drinkify
```

Entre no diretório do projeto

```bash
  cd drinkify
```

Instale as dependências

```bash
  pnpm install
```

Inicie o Postgres, o NGINX e a API com o Docker Compose. Este comando roda pronto para prod junto com as devidas migrations.

```bash
  docker compose up -d
```


## Autores

- [@leonardonicola](https://www.github.com/leonardonicola)

