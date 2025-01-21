# Use a lightweight Python base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the container
COPY app.py .
COPY index.html .

# Expose the port the app will run on
EXPOSE 5000

# Set the default command to run the Python HTTP server
CMD ["python", "app.py"]
