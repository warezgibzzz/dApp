FROM node:9.2.0

WORKDIR /app

RUN npm install -g truffle

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000

CMD npm start
