## Project overview (project2)

Full-stack realty listing sample composed of an Angular 8 client and Spring Boot 2.2 resource server, with MongoDB for persistence, and Prometheus/Grafana for metrics. Versions are intentionally pinned for the project2 branch, and everything is wired together through `docker-compose.yml`.

## Repository layout
- `client/` - Angular UI for browsing, creating, editing, and deleting property listings. Uses Angular Material for layout.
- `resource-server/` - Spring Boot API (`/api/v1`) backed by MongoDB. Includes MapStruct mappers, Prometheus actuator endpoint, and Docker image build via the `com.bmuschko.docker-spring-boot-application` Gradle plugin.
- `mongo/init-mongo.js` - seeds Mongo with credentials (`root`/`root`) and a sample property listing document.
- `prometheus/prometheus.yml` - scrapes the resource server actuator metrics.
- `docker-compose.yml` - orchestrates MongoDB, resource server, Angular client, Prometheus, and Grafana.

## Running with Docker Compose
1. Build the backend image with the plugin-provided `dockerBuildImage` task.
   - Use Java 8 for this legacy stack (OpenJDK 8 matches the Docker base image).
   - Use Gradle 5-6 to stay compatible with Spring Boot 2.2.
   ```bash
   cd resource-server
   ./gradlew dockerBuildImage
   cd ..
   ```
   - This branch does not include a Gradle wrapper. Install Gradle 5-6 locally or generate a wrapper and use `./gradlew`.
   - If task names differ, run `gradle tasks --group docker` to list the plugin's Docker tasks.
2. Start the stack (from repo root):
   ```bash
   docker-compose up --build
   ```
3. Default endpoints:
   - Client: http://localhost:4200
   - API: http://localhost:8090/api/v1
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3000

## Running services without Docker
- **Dependencies:**
  - MongoDB running with the database configured in `application.yaml` and `root/root` credentials (seeded via `mongo/init-mongo.js`).
- **Backend:** `cd resource-server && ./gradlew bootRun` (or `gradle bootRun` with Gradle 5-6). Requires MongoDB running locally; URLs match `src/main/resources/application.yaml`.
- **Frontend:** `cd client && npm install && npm start` (Angular CLI 8).

## Testing
- Backend: `./gradlew test` (or `gradle test` with Gradle 5-6; newer Gradle versions conflict with the Spring Boot 2.2 Gradle plugin).
- Frontend: `cd client && npm test` (Jasmine/Karma).
