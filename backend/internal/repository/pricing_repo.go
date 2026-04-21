package repository

import (
	"appnity-backend/internal/models"
	"context"
	"encoding/json"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PricingRepository struct {
	db *pgxpool.Pool
}

func NewPricingRepository(db *pgxpool.Pool) *PricingRepository {
	return &PricingRepository{db: db}
}

func (r *PricingRepository) GetAll(ctx context.Context) ([]models.PricingTier, error) {
	rows, err := r.db.Query(ctx, "SELECT id, slug, title, description, COALESCE(price_amount, 0), COALESCE(price_display, ''), COALESCE(features, '[]'::jsonb), COALESCE(accent_color, ''), COALESCE(bg_color, ''), COALESCE(is_popular, false), COALESCE(sort_order, 0), is_active FROM pricing_tiers WHERE is_active = true ORDER BY sort_order")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tiers []models.PricingTier
	for rows.Next() {
		var t models.PricingTier
		var features []byte
		err := rows.Scan(&t.ID, &t.Slug, &t.Title, &t.Description, &t.PriceAmount, &t.PriceDisplay,
			&features, &t.AccentColor, &t.BgColor, &t.IsPopular, &t.SortOrder, &t.IsActive)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(features, &t.Features)
		tiers = append(tiers, t)
	}
	return tiers, rows.Err()
}

func (r *PricingRepository) ListAll(ctx context.Context) ([]models.PricingTier, error) {
	rows, err := r.db.Query(ctx, "SELECT id, slug, title, description, COALESCE(price_amount, 0), COALESCE(price_display, ''), COALESCE(features, '[]'::jsonb), COALESCE(accent_color, ''), COALESCE(bg_color, ''), COALESCE(is_popular, false), COALESCE(sort_order, 0), is_active, created_at FROM pricing_tiers ORDER BY sort_order, created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tiers []models.PricingTier
	for rows.Next() {
		var t models.PricingTier
		var features []byte
		err := rows.Scan(&t.ID, &t.Slug, &t.Title, &t.Description, &t.PriceAmount, &t.PriceDisplay,
			&features, &t.AccentColor, &t.BgColor, &t.IsPopular, &t.SortOrder, &t.IsActive, &t.CreatedAt)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(features, &t.Features)
		tiers = append(tiers, t)
	}
	return tiers, rows.Err()
}

func (r *PricingRepository) GetBySlug(ctx context.Context, slug string) (*models.PricingTier, error) {
	var t models.PricingTier
	var features []byte
	err := r.db.QueryRow(ctx, "SELECT id, slug, title, description, COALESCE(price_amount, 0), COALESCE(price_display, ''), COALESCE(features, '[]'::jsonb), COALESCE(accent_color, ''), COALESCE(bg_color, ''), COALESCE(is_popular, false), COALESCE(sort_order, 0), is_active FROM pricing_tiers WHERE slug = $1", slug).
		Scan(&t.ID, &t.Slug, &t.Title, &t.Description, &t.PriceAmount, &t.PriceDisplay,
			&features, &t.AccentColor, &t.BgColor, &t.IsPopular, &t.SortOrder, &t.IsActive)
	if err == pgx.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	json.Unmarshal(features, &t.Features)
	return &t, nil
}

func (r *PricingRepository) Create(ctx context.Context, tier *models.PricingTier) error {
	features, _ := json.Marshal(tier.Features)
	query := `INSERT INTO pricing_tiers (slug, title, description, price_amount, price_display, features, accent_color, bg_color, is_popular, sort_order) 
	          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, created_at`
	return r.db.QueryRow(ctx, query, tier.Slug, tier.Title, tier.Description, tier.PriceAmount, tier.PriceDisplay,
		features, tier.AccentColor, tier.BgColor, tier.IsPopular, tier.SortOrder).Scan(&tier.ID, &tier.CreatedAt)
}

func (r *PricingRepository) Update(ctx context.Context, tier *models.PricingTier) error {
	features, _ := json.Marshal(tier.Features)
	query := `UPDATE pricing_tiers SET slug = $2, title = $3, description = $4, price_amount = $5, price_display = $6, features = $7, accent_color = $8, bg_color = $9, is_popular = $10, sort_order = $11, is_active = $12 WHERE id = $1`
	_, err := r.db.Exec(ctx, query, tier.ID, tier.Slug, tier.Title, tier.Description, tier.PriceAmount,
		tier.PriceDisplay, features, tier.AccentColor, tier.BgColor, tier.IsPopular, tier.SortOrder, tier.IsActive)
	return err
}

func (r *PricingRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.Exec(ctx, "DELETE FROM pricing_tiers WHERE id = $1", id)
	return err
}
