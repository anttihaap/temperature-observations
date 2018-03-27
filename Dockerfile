FROM node:6.13.1

COPY . .

#Install and build reactjs
WORKDIR /client
RUN npm install
RUN npm run build:prod

#Install express server
WORKDIR /
RUN npm install

CMD ["npm", "run", "prod"]

EXPOSE 8080
