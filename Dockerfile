# Step 1: Use an official Node.js runtime as a parent image
FROM node:18 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Use a lightweight web server to serve the static files
FROM nginx:alpine

# Step 8: Copy the build output to the Nginx server's static folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port on which the app will run
EXPOSE 80

# Step 10: Define the default command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]
