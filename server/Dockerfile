FROM node:10
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/uploads
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]