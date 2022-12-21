FROM node:18-alpine3.15

WORKDIR /app
RUN npm i -g pnpm
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpn run build
EXPOSE 8000
CMD [ "pnpm","start" ]