FROM node:18.10 as build

WORKDIR /usr/local/app/

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build

FROM nginx:latest as runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/local/app/dist/client /usr/share/nginx/html

EXPOSE 80


