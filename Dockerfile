FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --no-dev

COPY . .

EXPOSE 80

CMD ["sudo", "npm", "start"]
