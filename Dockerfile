FROM node:8.11.1-alpine

COPY package*.json /

RUN npm install

WORKDIR /app
