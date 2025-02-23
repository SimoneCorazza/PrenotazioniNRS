FROM node:22-alpine AS build

COPY . .

RUN npm install
RUN npm run build


FROM nginx:1.27.4-alpine-perl


WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /build .
