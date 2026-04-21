package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"context"

	"github.com/google/uuid"
)

type PricingService struct {
	repo *repository.PricingRepository
}

func NewPricingService(repo *repository.PricingRepository) *PricingService {
	return &PricingService{repo: repo}
}

func (s *PricingService) GetAll(ctx context.Context) ([]models.PricingTier, error) {
	return s.repo.GetAll(ctx)
}

func (s *PricingService) ListAll(ctx context.Context) ([]models.PricingTier, error) {
	return s.repo.ListAll(ctx)
}

func (s *PricingService) GetBySlug(ctx context.Context, slug string) (*models.PricingTier, error) {
	return s.repo.GetBySlug(ctx, slug)
}

func (s *PricingService) Create(ctx context.Context, tier *models.PricingTier) error {
	return s.repo.Create(ctx, tier)
}

func (s *PricingService) Update(ctx context.Context, tier *models.PricingTier) error {
	return s.repo.Update(ctx, tier)
}

func (s *PricingService) Delete(ctx context.Context, id string) error {
	parsedID, err := uuid.Parse(id)
	if err != nil {
		return err
	}
	return s.repo.Delete(ctx, parsedID)
}
