package repository

import (
	"appnity-backend/internal/models"
	"context"

	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type BlogRepository struct {
	db *pgxpool.Pool
}

func NewBlogRepository(db *pgxpool.Pool) *BlogRepository {
	return &BlogRepository{db: db}
}

func (r *BlogRepository) GetAll(ctx context.Context, page, limit int) ([]models.BlogPost, int, error) {
	offset := (page - 1) * limit

	var total int
	r.db.QueryRow(ctx, "SELECT COUNT(*) FROM blog_posts WHERE is_published = true").Scan(&total)

	rows, err := r.db.Query(ctx, `
		SELECT id, slug, title, excerpt, content, category, author_name, author_avatar, 
		       image_url, COALESCE(tags, ARRAY[]::text[]), is_featured, is_published, COALESCE(view_count, 0), published_at, created_at, updated_at
		FROM blog_posts WHERE is_published = true
		ORDER BY is_featured DESC, published_at DESC
		LIMIT $1 OFFSET $2
	`, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var posts []models.BlogPost
	for rows.Next() {
		var p models.BlogPost
		err := rows.Scan(&p.ID, &p.Slug, &p.Title, &p.Excerpt, &p.Content, &p.Category,
			&p.AuthorName, &p.AuthorAvatar, &p.ImageURL, &p.Tags, &p.IsFeatured,
			&p.IsPublished, &p.ViewCount, &p.PublishedAt, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			return nil, 0, err
		}
		posts = append(posts, p)
	}
	return posts, total, nil
}

func (r *BlogRepository) ListAll(ctx context.Context) ([]models.BlogPost, error) {
	rows, err := r.db.Query(ctx, `
		SELECT id, slug, title, excerpt, content, category, author_name, author_avatar,
		       image_url, COALESCE(tags, ARRAY[]::text[]), is_featured, is_published, COALESCE(view_count, 0), published_at, created_at, updated_at
		FROM blog_posts
		ORDER BY is_featured DESC, created_at DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []models.BlogPost
	for rows.Next() {
		var p models.BlogPost
		err := rows.Scan(&p.ID, &p.Slug, &p.Title, &p.Excerpt, &p.Content, &p.Category,
			&p.AuthorName, &p.AuthorAvatar, &p.ImageURL, &p.Tags, &p.IsFeatured,
			&p.IsPublished, &p.ViewCount, &p.PublishedAt, &p.CreatedAt, &p.UpdatedAt)
		if err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}
	return posts, nil
}

func (r *BlogRepository) GetBySlug(ctx context.Context, slug string) (*models.BlogPost, error) {
	var p models.BlogPost
	query := `SELECT id, slug, title, excerpt, content, category, author_name, author_avatar, 
	          image_url, tags, is_featured, is_published, view_count, published_at, created_at, updated_at
	          FROM blog_posts WHERE slug = $1`
	err := r.db.QueryRow(ctx, query, slug).Scan(
		&p.ID, &p.Slug, &p.Title, &p.Excerpt, &p.Content, &p.Category,
		&p.AuthorName, &p.AuthorAvatar, &p.ImageURL, &p.Tags, &p.IsFeatured,
		&p.IsPublished, &p.ViewCount, &p.PublishedAt, &p.CreatedAt, &p.UpdatedAt,
	)
	if err == pgx.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	// Increment view count
	r.db.Exec(ctx, "UPDATE blog_posts SET view_count = view_count + 1 WHERE id = $1", p.ID)
	p.ViewCount++

	return &p, nil
}

func (r *BlogRepository) Create(ctx context.Context, post *models.BlogPost) error {
	query := `
		INSERT INTO blog_posts (slug, title, excerpt, content, category, author_name, author_avatar, image_url, tags, is_featured, is_published, published_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
		RETURNING id, created_at, updated_at
	`
	now := time.Now()
	if post.PublishedAt == nil {
		post.PublishedAt = &now
	}
	return r.db.QueryRow(ctx, query, post.Slug, post.Title, post.Excerpt, post.Content, post.Category,
		post.AuthorName, post.AuthorAvatar, post.ImageURL, post.Tags, post.IsFeatured, post.IsPublished, post.PublishedAt,
	).Scan(&post.ID, &post.CreatedAt, &post.UpdatedAt)
}

func (r *BlogRepository) Update(ctx context.Context, post *models.BlogPost) error {
	query := `UPDATE blog_posts SET title = $2, excerpt = $3, content = $4, category = $5, author_name = $6, image_url = $7, tags = $8, is_featured = $9, is_published = $10, updated_at = NOW() WHERE id = $1`
	_, err := r.db.Exec(ctx, query, post.ID, post.Title, post.Excerpt, post.Content, post.Category,
		post.AuthorName, post.ImageURL, post.Tags, post.IsFeatured, post.IsPublished)
	return err
}

func (r *BlogRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.Exec(ctx, "DELETE FROM blog_posts WHERE id = $1", id)
	return err
}
