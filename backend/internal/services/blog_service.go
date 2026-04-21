package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"context"
)

type BlogService struct {
	repo *repository.BlogRepository
}

func NewBlogService(repo *repository.BlogRepository) *BlogService {
	return &BlogService{repo: repo}
}

func (s *BlogService) GetAll(ctx context.Context, page, limit int) ([]models.BlogPost, int, error) {
	return s.repo.GetAll(ctx, page, limit)
}

func (s *BlogService) ListAll(ctx context.Context) ([]models.BlogPost, error) {
	return s.repo.ListAll(ctx)
}

func (s *BlogService) GetBySlug(ctx context.Context, slug string) (*models.BlogPost, error) {
	return s.repo.GetBySlug(ctx, slug)
}

func (s *BlogService) Create(ctx context.Context, post *models.BlogPost) error {
	return s.repo.Create(ctx, post)
}

func (s *BlogService) Update(ctx context.Context, post *models.BlogPost) error {
	return s.repo.Update(ctx, post)
}

func (s *BlogService) Delete(ctx context.Context, id string) error {
	return nil
}
