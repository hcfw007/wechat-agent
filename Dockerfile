# syntax=docker/dockerfile:1

FROM node:16-alpine
WORKDIR /app

COPY ./src ./src
COPY ./config ./config
COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm install

ENTRYPOINT npm start