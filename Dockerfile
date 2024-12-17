FROM node:latest 
WORKDIR /app
COPY package*.json ./
RUN npm instal
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3001
CMD ["serve", "-s", "build", "-l", "3001"]