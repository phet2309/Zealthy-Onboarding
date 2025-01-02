# Use an official OpenJDK image as the base image
FROM openjdk:22-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file into the container
COPY target/custom-onboarding-0.0.1-SNAPSHOT.jar app.jar

# Expose any necessary ports (replace 8080 with your app's port)
EXPOSE 8080

# Define environment variables
ENV DB_URL=""
ENV DB_USERNAME=""
ENV DB_PASSWORD=""
ENV FRONTEND_URL=""

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
