# Use an official Node runtime as a parent image
FROM node:current-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Make port available to outside world
EXPOSE 5000

# Run index.js when the container launches
CMD ["npm", "start"]
