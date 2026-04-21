package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"context"

	"github.com/google/uuid"
)

type FAQService struct {
	repo *repository.FAQRepository
}

func NewFAQService(repo *repository.FAQRepository) *FAQService {
	return &FAQService{repo: repo}
}

func (s *FAQService) GetAll(ctx context.Context) ([]models.FAQ, error) {
	return s.repo.GetAll(ctx)
}

func (s *FAQService) ListAll(ctx context.Context) ([]models.FAQ, error) {
	return s.repo.ListAll(ctx)
}

func (s *FAQService) Create(ctx context.Context, faq *models.FAQ) error {
	return s.repo.Create(ctx, faq)
}

func (s *FAQService) Update(ctx context.Context, faq *models.FAQ) error {
	return s.repo.Update(ctx, faq)
}

func (s *FAQService) Delete(ctx context.Context, id string) error {
	parsedID, err := uuid.Parse(id)
	if err != nil {
		return err
	}
	return s.repo.Delete(ctx, parsedID)
}
