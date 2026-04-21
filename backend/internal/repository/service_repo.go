package repository

import (
	"appnity-backend/internal/models"
	"context"
	"encoding/json"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ServiceRepository struct {
	db *pgxpool.Pool
}

func NewServiceRepository(db *pgxpool.Pool) *ServiceRepository {
	return &ServiceRepository{db: db}
}

func (r *ServiceRepository) GetAll(ctx context.Context) ([]models.Service, error) {
	rows, err := r.db.Query(ctx, "SELECT id, slug, title, description, icon, features, category, sort_order, is_active FROM services WHERE is_active = true ORDER BY sort_order")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var services []models.Service
	for rows.Next() {
		var s models.Service
		var features []byte
		err := rows.Scan(&s.ID, &s.Slug, &s.Title, &s.Description, &s.Icon, &features, &s.Category, &s.SortOrder, &s.IsActive)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(features, &s.Features)
		services = append(services, s)
	}
	return services, nil
}

func (r *ServiceRepository) ListAll(ctx context.Context) ([]models.Service, error) {
	rows, err := r.db.Query(ctx, "SELECT id, slug, title, description, icon, features, category, sort_order, is_active, created_at FROM services ORDER BY sort_order, created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var services []models.Service
	for rows.Next() {
		var s models.Service
		var features []byte
		err := rows.Scan(&s.ID, &s.Slug, &s.Title, &s.Description, &s.Icon, &features, &s.Category, &s.SortOrder, &s.IsActive, &s.CreatedAt)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(features, &s.Features)
		services = append(services, s)
	}
	return services, nil
}

func (r *ServiceRepository) GetBySlug(ctx context.Context, slug string) (*models.Service, error) {
	var s models.Service
	var features []byte
	err := r.db.QueryRow(ctx, "SELECT id, slug, title, description, icon, features, category, sort_order, is_active FROM services WHERE slug = $1", slug).
		Scan(&s.ID, &s.Slug, &s.Title, &s.Description, &s.Icon, &features, &s.Category, &s.SortOrder, &s.IsActive)
	if err == pgx.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	json.Unmarshal(features, &s.Features)
	return &s, nil
}

func (r *ServiceRepository) Create(ctx context.Context, service *models.Service) error {
	features, _ := json.Marshal(service.Features)
	query := `INSERT INTO services (slug, title, description, icon, features, category, sort_order, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, created_at`
	return r.db.QueryRow(ctx, query, service.Slug, service.Title, service.Description, service.Icon, features, service.Category, service.SortOrder, service.IsActive).
		Scan(&service.ID, &service.CreatedAt)
}

func (r *ServiceRepository) Update(ctx context.Context, service *models.Service) error {
	features, _ := json.Marshal(service.Features)
	query := `UPDATE services SET slug = $2, title = $3, description = $4, icon = $5, features = $6, category = $7, sort_order = $8, is_active = $9 WHERE id = $1`
	_, err := r.db.Exec(ctx, query, service.ID, service.Slug, service.Title, service.Description, service.Icon, features, service.Category, service.SortOrder, service.IsActive)
	return err
}

func (r *ServiceRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.Exec(ctx, "DELETE FROM services WHERE id = $1", id)
	return err
}
