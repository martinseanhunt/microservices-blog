FROM node:alpine

# Fix for CRA inside a docker container 
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY ./ ./

CMD ["yarn", "start"]
