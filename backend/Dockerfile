# Using your exact Node.js version (v22.14.0)
FROM node:22.14.0-alpine

# Set working directory
WORKDIR /app

# Copy package files for caching
COPY package.json package-lock.json ./

# Install dependencies (npm)
RUN npm install --production

# Copy all source files
COPY . .

# Build the app (TypeScript)
RUN npm run build

# Expose port 4000
EXPOSE 4000

# Start in production mode
CMD ["npm", "run", "prod"]