# ---- Base
FROM node:latest as base 

WORKDIR /usr/ui/

COPY ./package*.json .
COPY ./src ./src
COPY ./lib ./lib
COPY ./tsconfig.json .
COPY ./rollup.config.js .

RUN npm ci


# ---- Prod
FROM base as production

CMD npm run build


# ---- Dev
FROM base as development

CMD npm run watch
