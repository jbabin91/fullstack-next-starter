FROM node:14-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
# RUN npm ci
COPY tsconfig*.json ./
COPY .env ./
COPY src src
RUN yarn && \
  yarn run build && \
  yarn cache clean

FROM node:14-alpine
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY package*.json ./
COPY yarn.lock ./
COPY .env ./
RUN yarn
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE 8000
ENTRYPOINT [ "/sbin/tini","--", "node", "dist/index" ]

