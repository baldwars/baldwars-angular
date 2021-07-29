#############
### build ###
#############

# base image
FROM node:12.16.1 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run prod

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine
#FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/baldwars-angular /usr/share/nginx/html
