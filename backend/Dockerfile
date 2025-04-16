# Use the official Bun image
FROM oven/bun

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN bun install

# Expose the app port (Render uses PORT env variable)
EXPOSE 3000

# Run the app
CMD ["bun", "start"]
