# Stage 1 - Build JAR with Maven
FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Stage 2 - Run JAR
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=builder /app/target/ats-resume-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]