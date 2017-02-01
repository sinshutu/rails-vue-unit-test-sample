FROM node:7.4.0-slim

WORKDIR /app/client
RUN useradd --user-group --create-home --shell /bin/false app

ENV PATH /app/client/node_modules/.bin:$PATH

COPY package.json /app/client/package.json

RUN chown -R app:app /app/client

USER app

RUN mkdir /app/client/node_modules &&\
npm install
