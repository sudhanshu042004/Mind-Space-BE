# Use official Python image
FROM python:3.12-slim

# Set working directory inside container
WORKDIR /app

# Copy your Python project files into the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your app will run on (optional hint)
EXPOSE 8000

# Run your Python app
CMD ["python", "server.py"]
