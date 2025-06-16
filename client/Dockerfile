FROM node:22.16.0

WORKDIR /client

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]