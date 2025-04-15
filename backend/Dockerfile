# Use official Bun image
FROM oven/bun

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install

# Generate RSA keys when container builds
RUN mkdir -p /app/src/secret && \
    openssl genrsa -out /app/src/secret/private.pem 2048 && \
    openssl rsa -in /app/src/secret/private.pem -pubout -out /app/src/secret/public.pem

# Expose your app port (change this if needed)
EXPOSE 3000

# Run the app
CMD ["bun", "start"]
