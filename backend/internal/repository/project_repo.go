package repository

import (
	"appnity-backend/internal/models"
	"context"
	"encoding/json"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProjectRepository struct {
	db *pgxpool.Pool
}

func NewProjectRepository(db *pgxpool.Pool) *ProjectRepository {
	return &ProjectRepository{db: db}
}

func (r *ProjectRepository) Create(ctx context.Context, project *models.Project) error {
	images, _ := json.Marshal(project.Images)
	results, _ := json.Marshal(project.Results)
	stats, _ := json.Marshal(project.Stats)

	query := `
		INSERT INTO projects (slug, title, category, client, description, duration, year, image_url, images, tags, accent_color, challenge, solution, results, stats, is_featured, is_published, sort_order)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
		RETURNING id, created_at, updated_at
	`
	return r.db.QueryRow(ctx, query,
		project.Slug, project.Title, project.Category, project.Client, project.Description,
		project.Duration, project.Year, project.ImageURL, images, project.Tags,
		project.AccentColor, project.Challenge, project.Solution, results, stats,
		project.IsFeatured, project.IsPublished, project.SortOrder,
	).Scan(&project.ID, &project.CreatedAt, &project.UpdatedAt)
}

func (r *ProjectRepository) GetAll(ctx context.Context, category string) ([]models.Project, error) {
	query := `SELECT id, slug, title, category, client, description, duration, year, image_url, COALESCE(images, '[]'::jsonb), COALESCE(tags, ARRAY[]::text[]), accent_color, challenge, solution, COALESCE(results, '[]'::jsonb), COALESCE(stats, '[]'::jsonb), is_featured, is_published, COALESCE(sort_order, 0), created_at, updated_at FROM projects WHERE is_published = true`
	args := []interface{}{}

	if category != "" && category != "All" {
		query += " AND category = $1"
		args = append(args, category)
	}
	query += " ORDER BY sort_order ASC, created_at DESC"

	rows, err := r.db.Query(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var projects []models.Project
	for rows.Next() {
		var p models.Project
		var images, results, stats []byte
		err := rows.Scan(&p.ID, &p.Slug, &p.Title, &p.Category, &p.Client, &p.Description,
			&p.Duration, &p.Year, &p.ImageURL, &images, &p.Tags, &p.AccentColor,
			&p.Challenge, &p.Solution, &results, &stats,
			&p.IsFeatured, &p.IsPublished, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(images, &p.Images)
		json.Unmarshal(results, &p.Results)
		json.Unmarshal(stats, &p.Stats)
		projects = append(projects, p)
	}
	return projects, nil
}

func (r *ProjectRepository) ListAll(ctx context.Context) ([]models.Project, error) {
	query := `SELECT id, slug, title, category, client, description, duration, year, image_url, COALESCE(images, '[]'::jsonb), COALESCE(tags, ARRAY[]::text[]), accent_color, challenge, solution, COALESCE(results, '[]'::jsonb), COALESCE(stats, '[]'::jsonb), is_featured, is_published, COALESCE(sort_order, 0), created_at, updated_at FROM projects ORDER BY sort_order ASC, created_at DESC`
	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var projects []models.Project
	for rows.Next() {
		var p models.Project
		var images, results, stats []byte
		err := rows.Scan(&p.ID, &p.Slug, &p.Title, &p.Category, &p.Client, &p.Description,
			&p.Duration, &p.Year, &p.ImageURL, &images, &p.Tags, &p.AccentColor,
			&p.Challenge, &p.Solution, &results, &stats,
			&p.IsFeatured, &p.IsPublished, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(images, &p.Images)
		json.Unmarshal(results, &p.Results)
		json.Unmarshal(stats, &p.Stats)
		projects = append(projects, p)
	}
	return projects, nil
}

func (r *ProjectRepository) GetBySlug(ctx context.Context, slug string) (*models.Project, error) {
	var p models.Project
	var images, results, stats []byte

	query := `SELECT id, slug, title, category, client, description, duration, year, image_url, COALESCE(images, '[]'::jsonb), COALESCE(tags, ARRAY[]::text[]), accent_color, challenge, solution, COALESCE(results, '[]'::jsonb), COALESCE(stats, '[]'::jsonb), is_featured, is_published, COALESCE(sort_order, 0), created_at, updated_at FROM projects WHERE slug = $1`
	err := r.db.QueryRow(ctx, query, slug).Scan(
		&p.ID, &p.Slug, &p.Title, &p.Category, &p.Client, &p.Description,
		&p.Duration, &p.Year, &p.ImageURL, &images, &p.Tags, &p.AccentColor,
		&p.Challenge, &p.Solution, &results, &stats,
		&p.IsFeatured, &p.IsPublished, &p.SortOrder, &p.CreatedAt, &p.UpdatedAt,
	)

	if err == pgx.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	json.Unmarshal(images, &p.Images)
	json.Unmarshal(results, &p.Results)
	json.Unmarshal(stats, &p.Stats)
	return &p, nil
}

func (r *ProjectRepository) Update(ctx context.Context, project *models.Project) error {
	images, _ := json.Marshal(project.Images)
	results, _ := json.Marshal(project.Results)
	stats, _ := json.Marshal(project.Stats)

	query := `UPDATE projects SET title = $2, category = $3, client = $4, description = $5, duration = $6, year = $7, image_url = $8, images = $9, tags = $10, accent_color = $11, challenge = $12, solution = $13, results = $14, stats = $15, is_featured = $16, is_published = $17, sort_order = $18, updated_at = NOW() WHERE id = $1`
	_, err := r.db.Exec(ctx, query, project.ID, project.Title, project.Category, project.Client,
		project.Description, project.Duration, project.Year, project.ImageURL, images, project.Tags,
		project.AccentColor, project.Challenge, project.Solution, results, stats,
		project.IsFeatured, project.IsPublished, project.SortOrder)
	return err
}

func (r *ProjectRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.Exec(ctx, "DELETE FROM projects WHERE id = $1", id)
	return err
}

func (r *ProjectRepository) GetCategories(ctx context.Context) ([]string, error) {
	rows, err := r.db.Query(ctx, "SELECT DISTINCT category FROM projects WHERE is_published = true ORDER BY category")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []string
	for rows.Next() {
		var cat string
		if err := rows.Scan(&cat); err == nil {
			categories = append(categories, cat)
		}
	}
	return categories, nil
}
