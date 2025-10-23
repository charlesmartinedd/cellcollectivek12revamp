FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY src/client/package*.json ./src/client/

# Install dependencies
RUN npm install
RUN cd src/client && npm install

# Copy source code
COPY . .

# Expose ports
EXPOSE 3000 5173

# Start development server
CMD ["npm", "run", "dev"]
