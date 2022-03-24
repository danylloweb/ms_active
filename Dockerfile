FROM node:alpine
WORKDIR /app
COPY . .
RUN npm i -g @adonisjs/cli
RUN npm install
CMD ["adonis", "serve"]
