FROM node:lts AS builder
WORKDIR app
COPY . /app
RUN cd rest-client && yarn install && yarn build

FROM golang:1.18-bullseye
WORKDIR client
COPY --from=builder /app .
RUN go mod tidy
RUN go build main.go
CMD ["./main"]