# ---- Base
FROM node:latest as base 

WORKDIR /usr/ui/

COPY ./package*.json .
COPY ./src ./src
COPY ./scripts ./scripts
COPY ./tsconfig.json .

RUN npm install


# ---- Prod
FROM base as production

CMD npm run build

# ---- Dev
FROM base as development

CMD npm run watch
