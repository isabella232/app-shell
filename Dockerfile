FROM node:12-alpine
WORKDIR /app
COPY . /app
RUN yarn install

CMD yarn app
