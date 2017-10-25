FROM node:8
WORKDIR /app

ADD package.json /app
ADD .env /app
RUN npm install

ADD src/ /app/src
EXPOSE 9009
CMD [ "npm", "start" ]
