FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli

WORKDIR /home/node/app

USER node