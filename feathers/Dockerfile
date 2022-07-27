FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @feathersjs/cli

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3010

CMD ["npm", "run", "start"]