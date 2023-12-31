# build stage
FROM node:21-alpine3.18 as build
WORKDIR /usr/local/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.25.3-alpine
COPY --from=build /usr/local/app/dist/frontend-my-blogs /usr/share/nginx/html
EXPOSE 80
