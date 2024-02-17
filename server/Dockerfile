# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:21.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy prisma 
COPY prisma ./prisma/ 

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Specify the command to run your application
CMD [ "npm", "start" ]
