# Use official Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt grpcio-tools

# Copy everything else
COPY . .

# Generate gRPC Python files
RUN python -m grpc_tools.protoc -I./proto --python_out=. --grpc_python_out=. mindSpace.proto

# Expose the port your gRPC server will run on
EXPOSE 50051

# Run the server
CMD ["python", "server.py"]
