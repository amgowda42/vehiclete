FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN npx tsc

RUN npm prune --omit=dev

EXPOSE 8001

CMD ["node", "dist/server.js"]