FROM node:12
ARG ENV
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
RUN apt-get update
COPY . .
EXPOSE 3000
CMD ["npm", "run","deploy"]