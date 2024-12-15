FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#FROM nginx as production-stage
#RUN mkdir /app
#COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy root filesystem
#COPY rootfs /