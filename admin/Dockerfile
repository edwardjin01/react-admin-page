# FROM mhart/alpine-node:11 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN yarn
# RUN yarn run build

# FROM mhart/alpine-node
# RUN yarn global add serve
# WORKDIR /app
# COPY --from=builder /app/build .
# CMD ["serve", "-p", "3000", "-s", "."]

FROM nginx
COPY build /usr/share/nginx/html