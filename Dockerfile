FROM node:lts AS builder
WORKDIR /app
COPY . /app

ARG HTTP_URL
ARG WEBSOCKET_URL

ENV REACT_APP_HTTP_API_URL="${HTTP_URL}"
ENV REACT_APP_WEBSOCKET_API_URL="${WEBSOCKET_URL}"
RUN cd rest-client && yarn install && yarn build

FROM golang:1.18-bullseye
WORKDIR /client
COPY --from=builder /app /client
RUN go mod tidy
RUN go build main.go
CMD ["./main"]