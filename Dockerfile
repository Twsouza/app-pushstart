FROM nginx:1.15.3-alpine

WORKDIR /etc/nginx/conf.d

COPY default.conf .

WORKDIR /usr/share/nginx/html

COPY /dist/app-pushstart .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]