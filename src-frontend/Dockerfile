FROM node:16-alpine as builder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i --legacy-peer-deps
RUN npm rebuild node-sass
CMD ["npm", "run", "start"]