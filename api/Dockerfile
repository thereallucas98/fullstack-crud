FROM node:alpine

# Quando o container rodar, vai definir a pasta (diretório) onde as informações
# estarão contidas.
WORKDIR /usr/app

# Realizando copia do package.json
COPY package.json ./

# Instalando as dependências da aplicação
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
