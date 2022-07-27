FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package* ./
RUN npm install --verbose

EXPOSE 8000

ENV HOST=0.0.0.0
ENV PORT=8000

COPY . ./
RUN npm run build --verbose

CMD [ "npm", "run", "start" ]