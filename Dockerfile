FROM node:16-alpine

WORKDIR /app

COPY package*.json . 

RUN npm install 

COPY . . 

RUN npx prisma generate

ENV DOT_ENV_PATH=./.env

EXPOSE 5000

CMD ["npm", "run", "start"]

 