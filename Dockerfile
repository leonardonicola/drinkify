FROM node:16 AS builder

# Create app directory
WORKDIR /api

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# Install app dependencies
RUN npm install

COPY . .
RUN npx prisma generate --schema ./src/infra/prisma/schema.prisma
RUN npm run build

EXPOSE 3000
