.PHONY: up down restart logs db-migrate db-push db-generate db-studio build clean

# Start the application and database
up:
	docker compose up -d

# Stop the application and database
down:
	docker compose down

# Restart all services
restart:
	docker compose restart

# View logs for the application container
logs:
	docker compose logs -f app

# Run Prisma database migration
db-migrate:
	docker compose exec app npx prisma migrate dev

# Run Prisma schema push (useful for quick local testing without migrations)
db-push:
	docker compose exec app npx prisma db push

# Generate Prisma Client
db-generate:
	docker compose exec app npx prisma generate

# Run Prisma Studio (accessible at http://localhost:5555)
db-studio:
	docker compose exec app npx prisma studio --port 5555

# Rebuild docker images
build:
	docker compose build --no-cache

# Remove docker containers, networks, and volumes
clean:
	docker compose down -v
