FROM node:18-alpine3.15

WORKDIR /app
RUN npm i -g pnpm
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build
RUN npx prisma generate
EXPOSE 8000
CMD [ "pnpm","start" ]
