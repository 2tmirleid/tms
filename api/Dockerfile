FROM eclipse-temurin:21-jdk

WORKDIR /api

COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle .
COPY settings.gradle .

RUN ./gradlew dependencies -x test

COPY src/ src/

# Сборка fat JAR-а
RUN ./gradlew bootJar -x test

# Узнай фактическое имя jar-файла (возможно с версией)
# или используй шаблон *.jar (если он один)
CMD ["sh", "-c", "java -jar build/libs/*.jar"]
