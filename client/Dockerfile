FROM node:7.4.0-slim

WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH

COPY package.json /app/client/package.json

RUN npm install --no-progress --registry http://registry.npmjs.org/
