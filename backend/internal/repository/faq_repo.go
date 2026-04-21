package repository

import (
	"appnity-backend/internal/models"
	"context"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type FAQRepository struct {
	db *pgxpool.Pool
}

func NewFAQRepository(db *pgxpool.Pool) *FAQRepository {
	return &FAQRepository{db: db}
}

func (r *FAQRepository) GetAll(ctx context.Context) ([]models.FAQ, error) {
	rows, err := r.db.Query(ctx, "SELECT id, question, answer, category, sort_order, is_active FROM faqs WHERE is_active = true ORDER BY sort_order")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var faqs []models.FAQ
	for rows.Next() {
		var f models.FAQ
		err := rows.Scan(&f.ID, &f.Question, &f.Answer, &f.Category, &f.SortOrder, &f.IsActive)
		if err != nil {
			return nil, err
		}
		faqs = append(faqs, f)
	}
	return faqs, nil
}

func (r *FAQRepository) ListAll(ctx context.Context) ([]models.FAQ, error) {
	rows, err := r.db.Query(ctx, "SELECT id, question, answer, category, sort_order, is_active, created_at FROM faqs ORDER BY sort_order, created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var faqs []models.FAQ
	for rows.Next() {
		var f models.FAQ
		err := rows.Scan(&f.ID, &f.Question, &f.Answer, &f.Category, &f.SortOrder, &f.IsActive, &f.CreatedAt)
		if err != nil {
			return nil, err
		}
		faqs = append(faqs, f)
	}
	return faqs, nil
}

func (r *FAQRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.FAQ, error) {
	var f models.FAQ
	err := r.db.QueryRow(ctx, "SELECT id, question, answer, category, sort_order, is_active FROM faqs WHERE id = $1", id).
		Scan(&f.ID, &f.Question, &f.Answer, &f.Category, &f.SortOrder, &f.IsActive)
	if err == pgx.ErrNoRows {
		return nil, nil
	}
	return &f, err
}

func (r *FAQRepository) Create(ctx context.Context, faq *models.FAQ) error {
	query := `INSERT INTO faqs (question, answer, category, sort_order, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING id, created_at`
	return r.db.QueryRow(ctx, query, faq.Question, faq.Answer, faq.Category, faq.SortOrder, faq.IsActive).Scan(&faq.ID, &faq.CreatedAt)
}

func (r *FAQRepository) Update(ctx context.Context, faq *models.FAQ) error {
	query := `UPDATE faqs SET question = $2, answer = $3, category = $4, sort_order = $5, is_active = $6 WHERE id = $1`
	_, err := r.db.Exec(ctx, query, faq.ID, faq.Question, faq.Answer, faq.Category, faq.SortOrder, faq.IsActive)
	return err
}

func (r *FAQRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.Exec(ctx, "DELETE FROM faqs WHERE id = $1", id)
	return err
}
