FROM node:23 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:23

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules

COPY --from=build /app .

EXPOSE 3000

CMD ["node", "app.js"]
