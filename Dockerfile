FROM node:14-alpine AS build-image
WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:14-alpine  AS prod-build
WORKDIR /app
COPY --from=build-image ./app/dist ./dist
COPY package* ./
RUN npm install --production
EXPOSE 4000