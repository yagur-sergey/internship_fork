FROM node:latest AS builder
COPY package.json package-lock.json ./

RUN npm ci && mkdir /ng-app && mv ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

RUN npm run ng build -- --prod --output-path=dist

FROM nginx:latest

COPY nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /ng-app/dist /usr/share/nginx/html

# FROM nginx:alpine
# COPY --from=builder /app/dist/* /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]