# Use an official Node runtime as a parent image
FROM node:current-slim

# Set the working directory.
WORKDIR /app

# Copy the dist files
COPY dist .

# Copy package.json
COPY package.json .

# Install dependencies
RUN npm install

# Make port available to outside world
EXPOSE 5000

# Run server when the container launches
CMD ["node", "server.js"]
