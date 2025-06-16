FROM eclipse-temurin:21-jdk

WORKDIR /api

COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle .
COPY settings.gradle .

RUN ./gradlew dependencies -x test

COPY src/ src/

RUN ./gradlew bootJar -x test

CMD ["sh", "-c", "java -jar build/libs/*.jar"]