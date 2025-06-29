FROM node:20.18.0-slim AS builder
WORKDIR /src
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build


FROM node:20.18.0-slim
WORKDIR /src
COPY package*.json ./
RUN npm install 
COPY --from=builder /src/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]