FROM node:22.16.0

WORKDIR /api

COPY package.json package-lock.json* ./

RUN rm -rf node_modules package-lock.json || true
RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
