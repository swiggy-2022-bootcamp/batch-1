FROM node:16

WORKDIR /StackOverflowApp

COPY . /StackOverflowApp
COPY package.json ./StackOverflowApp

RUN npm install
RUN npm install bcrypt


EXPOSE 8080

CMD ["node", "index.js"]
