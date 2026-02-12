# Build Stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ./node_modules/.bin/nest build

# Production Stage
FROM node:18-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
RUN npm install  --only=production
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
