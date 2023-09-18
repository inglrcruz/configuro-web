# Base image
FROM node:18.17.1-alpine

# Working directory
WORKDIR /app

# Copy necessary files
COPY package*.json ./
RUN yarn install

# Copy the rest of the application files
COPY . .

# Start the ReactJS application
CMD ["yarn", "start"]

