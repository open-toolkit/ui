# ---- Base
FROM node:latest as base 

WORKDIR /usr/ui/

COPY ./package*.json .
COPY ./.swcrc .
COPY ./src .

RUN npm install


# ---- Prod
FROM base as production

CMD npm run build

# ---- Dev
FROM base as development

CMD npm run watch
