package repository

import (
	"appnity-backend/internal/models"
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type SubscriberRepository struct {
	db *pgxpool.Pool
}

func NewSubscriberRepository(db *pgxpool.Pool) *SubscriberRepository {
	return &SubscriberRepository{db: db}
}

func (r *SubscriberRepository) Create(ctx context.Context, subscriber *models.Subscriber) error {
	query := `INSERT INTO subscribers (email, status, source) VALUES ($1, $2, $3) RETURNING id, created_at`
	return r.db.QueryRow(ctx, query, subscriber.Email, subscriber.Status, subscriber.Source).
		Scan(&subscriber.ID, &subscriber.CreatedAt)
}

func (r *SubscriberRepository) FindByEmail(ctx context.Context, email string) (*models.Subscriber, error) {
	var s models.Subscriber
	err := r.db.QueryRow(ctx, "SELECT id, email, status, source, confirmed_at, unsubscribed_at, created_at FROM subscribers WHERE email = $1", email).
		Scan(&s.ID, &s.Email, &s.Status, &s.Source, &s.ConfirmedAt, &s.UnsubscribedAt, &s.CreatedAt)
	if err != nil {
		return nil, nil
	}
	return &s, nil
}

func (r *SubscriberRepository) GetAll(ctx context.Context) ([]models.Subscriber, error) {
	rows, err := r.db.Query(ctx, "SELECT id, email, status, source, confirmed_at, unsubscribed_at, created_at FROM subscribers ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var subs []models.Subscriber
	for rows.Next() {
		var s models.Subscriber
		err := rows.Scan(&s.ID, &s.Email, &s.Status, &s.Source, &s.ConfirmedAt, &s.UnsubscribedAt, &s.CreatedAt)
		if err != nil {
			return nil, err
		}
		subs = append(subs, s)
	}
	return subs, nil
}

func (r *SubscriberRepository) Unsubscribe(ctx context.Context, email string) error {
	_, err := r.db.Exec(ctx, "UPDATE subscribers SET status = 'unsubscribed', unsubscribed_at = $2 WHERE email = $1", email, time.Now())
	return err
}

func (r *SubscriberRepository) Count(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRow(ctx, "SELECT COUNT(*) FROM subscribers WHERE status = 'active'").Scan(&count)
	return count, err
}
