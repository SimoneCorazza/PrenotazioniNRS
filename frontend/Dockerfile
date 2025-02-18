FROM node:22-alpine AS build

COPY . .

RUN npm install
RUN npm run build


FROM nginx:1.27.4-alpine-perl

COPY --from=build /build .
