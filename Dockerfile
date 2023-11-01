FROM node:21-alpine
EXPOSE 8010

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules & \
    npm install

COPY . ./

RUN npx prisma generate

CMD ["npm", "run", "dev"]