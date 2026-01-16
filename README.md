## Project overview (project2)

Full-stack realty listing sample composed of an Angular 8 client, Spring Boot 2.2 resource server secured with Keycloak, MongoDB for persistence, and Prometheus/Grafana for metrics. Versions are intentionally pinned for the project2 branch, and everything is wired together through `docker-compose.yml`.

## Repository layout
- `client/` - Angular UI for browsing, creating, editing, and deleting property listings. Uses Keycloak for auth and Angular Material for layout.
- `resource-server/` - Spring Boot API (`/api/v1`) backed by MongoDB. Includes Keycloak security, MapStruct mappers, Prometheus actuator endpoint, and Docker image build via the `com.bmuschko.docker-spring-boot-application` Gradle plugin.
- `keycloak/realm-export.json` - realm configuration imported on Keycloak start (see docker-compose).
- `mongo/init-mongo.js` - seeds Mongo with credentials (`root`/`root`) and a sample property listing document.
- `prometheus/prometheus.yml` - scrapes the resource server actuator metrics.
- `docker-compose.yml` - orchestrates MongoDB, Keycloak, resource server, Angular client, Prometheus, and Grafana.

## Running with Docker Compose
1. Build the backend image with the plugin-provided `dockerBuildImage` task (requires Java 8 for this legacy stack—OpenJDK 8 matches the Docker base image—and a Gradle version compatible with Spring Boot 2.2, e.g., Gradle 5-6):
   ```bash
   cd resource-server
   ./gradlew dockerBuildImage
   cd ..
   ```
   Note: this branch does not include a Gradle wrapper; install Gradle 5-6 locally or generate a wrapper and use `./gradlew`. If task names differ, run `gradle tasks --group docker` to list the plugin's Docker tasks.
2. Start the stack (from repo root):
   ```bash
   docker-compose up --build
   ```
3. Default endpoints:
   - Client: http://localhost:4200
   - API: http://localhost:8090/api/v1
   - Keycloak: http://localhost:8080 (admin/admin)
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3000

## Running services without Docker
- **Dependencies:**
  - MongoDB running with the database named `realties` (intentional spelling from the seed script/application config—do not rename) and `root/root` credentials (see `mongo/init-mongo.js`).
  - Keycloak started with the provided `keycloak/realm-export.json` import (the Keycloak service in `docker-compose` can be reused).
- **Backend:** `cd resource-server && ./gradlew bootRun` (or `gradle bootRun` with Gradle 5-6). Requires MongoDB and Keycloak running locally; URLs match `src/main/resources/application.yaml`.
- **Frontend:** `cd client && npm install && npm start` (Angular CLI 8). The app expects Keycloak at `http://localhost:8080`.

## Testing
- Backend: `./gradlew test` (or `gradle test` with Gradle 5-6 to avoid plugin compatibility issues).
- Frontend: `cd client && npm test` (Jasmine/Karma).
