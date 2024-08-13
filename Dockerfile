# Use Node.js 18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /src/app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Build the Next.js application
CMD ["make", "build"]

# Expose port 3000 for the Next.js server
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]