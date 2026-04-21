package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Connect() (*pgxpool.Pool, error) {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return nil, fmt.Errorf("DATABASE_URL environment variable is not set")
	}

	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %w", err)
	}

	// Test the connection
	if err := pool.Ping(context.Background()); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	log.Println("Connected to Neon database successfully")
	return pool, nil
}

func GetDSN() string {
	dbURL := GetenvOrDefault("DATABASE_URL", "")
	if dbURL == "" {
		// Build connection string from individual env vars
		host := GetenvOrDefault("NEON_HOST", "ep-xxx-xxx-xxx.us-east-2.aws.neon.tech")
		user := GetenvOrDefault("NEON_USER", "user")
		password := GetenvOrDefault("NEON_PASSWORD", "password")
		dbname := GetenvOrDefault("NEON_DB", "neondb")
		sslmode := GetenvOrDefault("NEON_SSLMODE", "require")

		dbURL = fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=%s", user, password, host, dbname, sslmode)
	}
	return dbURL
}

func GetenvOrDefault(key, defaultValue string) string {
	if value := getEnv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnv(key string) string {
	// Try environment variable
	if value := readEnv(key); value != "" {
		return value
	}

	// For local development, try .env file
	loadEnvFile()
	return readEnv(key)
}

func loadEnvFile() {
	// This is handled in main.go with godotenv
}

func readEnv(key string) string {
	return ""
}
