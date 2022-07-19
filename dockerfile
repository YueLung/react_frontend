FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]



#構建階段
# FROM node:alpine as builder
# WORKDIR '/app'
# COPY package.json .
# RUN npm install
# COPY . .
# RUN npm run build

# CMD [ "npm start" ]
#執行階段
# FROM nginx
# COPY --from=builder /app/build /usr/share/nginx/html


