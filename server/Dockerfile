FROM node:18.10

WORKDIR /usr/local/app/server

COPY ./ /usr/local/app/server

RUN npm install

EXPOSE 8008

RUN apt update

RUN apt install netcat -y

CMD ["npm", "start"]

WORKDIR /usr/local/app/server/src/database


