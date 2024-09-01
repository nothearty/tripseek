# Stage 1: Use Bun to build the frontend
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy necessary files and install dependencies
COPY package.json bun.lockb ./
RUN bun install

# Copy the rest of the application files
COPY . .

# Build the application using Bun and Vite
RUN bun run build

# Stage 2: Serve the frontend with Nginx
FROM nginx:stable-alpine AS production

# Copy the build output to Nginx’s html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx.conf file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
