package repository

import (
	"context"
	"encoding/json"

	"github.com/jackc/pgx/v5/pgxpool"
)

type SettingsRepository struct {
	db *pgxpool.Pool
}

func NewSettingsRepository(db *pgxpool.Pool) *SettingsRepository {
	return &SettingsRepository{db: db}
}

func (r *SettingsRepository) Get(ctx context.Context, key string) (any, error) {
	var raw []byte
	err := r.db.QueryRow(ctx, "SELECT value FROM site_settings WHERE key = $1", key).Scan(&raw)
	if err != nil {
		return map[string]any{}, err
	}

	var value any
	if err := json.Unmarshal(raw, &value); err != nil {
		return map[string]any{}, err
	}

	return value, nil
}

func (r *SettingsRepository) GetAll(ctx context.Context) (map[string]any, error) {
	rows, err := r.db.Query(ctx, "SELECT key, value FROM site_settings")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	settings := make(map[string]any)
	for rows.Next() {
		var key string
		var raw []byte
		if err := rows.Scan(&key, &raw); err == nil {
			var value any
			if err := json.Unmarshal(raw, &value); err == nil {
				settings[key] = value
			}
		}
	}
	return settings, nil
}

func (r *SettingsRepository) Set(ctx context.Context, key string, value any) error {
	payload, err := json.Marshal(value)
	if err != nil {
		return err
	}

	query := `INSERT INTO site_settings (key, value, updated_at) VALUES ($1, $2::jsonb, NOW()) 
	          ON CONFLICT (key) DO UPDATE SET value = $2::jsonb, updated_at = NOW()`
	_, err = r.db.Exec(ctx, query, key, string(payload))
	return err
}
