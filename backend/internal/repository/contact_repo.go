package repository

import (
	"appnity-backend/internal/models"
	"context"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ContactRepository struct {
	db *pgxpool.Pool
}

func NewContactRepository(db *pgxpool.Pool) *ContactRepository {
	return &ContactRepository{db: db}
}

func (r *ContactRepository) Create(ctx context.Context, inquiry *models.ContactInquiry) error {
	query := `
		INSERT INTO contact_inquiries (first_name, last_name, email, phone, company, message)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, created_at, updated_at
	`
	return r.db.QueryRow(ctx, query, inquiry.FirstName, inquiry.LastName, inquiry.Email, inquiry.Phone, inquiry.Company, inquiry.Message).
		Scan(&inquiry.ID, &inquiry.CreatedAt, &inquiry.UpdatedAt)
}

func (r *ContactRepository) GetAll(ctx context.Context, status string) ([]models.ContactInquiry, error) {
	query := `SELECT id, first_name, last_name, email, phone, company, message, status, priority, assigned_to, notes, created_at, updated_at FROM contact_inquiries`
	args := []interface{}{}

	if status != "" {
		query += " WHERE status = $1"
		args = append(args, status)
	}
	query += " ORDER BY created_at DESC"

	rows, err := r.db.Query(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var inquiries []models.ContactInquiry
	for rows.Next() {
		var i models.ContactInquiry
		err := rows.Scan(&i.ID, &i.FirstName, &i.LastName, &i.Email, &i.Phone, &i.Company,
			&i.Message, &i.Status, &i.Priority, &i.AssignedTo, &i.Notes, &i.CreatedAt, &i.UpdatedAt)
		if err != nil {
			return nil, err
		}
		inquiries = append(inquiries, i)
	}
	return inquiries, nil
}

func (r *ContactRepository) Update(ctx context.Context, inquiry *models.ContactInquiry) error {
	query := `UPDATE contact_inquiries SET status = $2, priority = $3, assigned_to = $4, notes = $5, updated_at = NOW() WHERE id = $1`
	_, err := r.db.Exec(ctx, query, inquiry.ID, inquiry.Status, inquiry.Priority, inquiry.AssignedTo, inquiry.Notes)
	return err
}

func (r *ContactRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.Exec(ctx, "DELETE FROM contact_inquiries WHERE id = $1", id)
	return err
}

func (r *ContactRepository) CountByStatus(ctx context.Context, status string) (int, error) {
	var count int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM contact_inquiries WHERE status = $1", status).Scan(&count)
	return count, err
}
