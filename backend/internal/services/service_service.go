package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"context"

	"github.com/google/uuid"
)

type ServiceService struct {
	repo *repository.ServiceRepository
}

func NewServiceService(repo *repository.ServiceRepository) *ServiceService {
	return &ServiceService{repo: repo}
}

func (s *ServiceService) GetAll(ctx context.Context) ([]models.Service, error) {
	return s.repo.GetAll(ctx)
}

func (s *ServiceService) ListAll(ctx context.Context) ([]models.Service, error) {
	return s.repo.ListAll(ctx)
}

func (s *ServiceService) GetBySlug(ctx context.Context, slug string) (*models.Service, error) {
	return s.repo.GetBySlug(ctx, slug)
}

func (s *ServiceService) Create(ctx context.Context, service *models.Service) error {
	return s.repo.Create(ctx, service)
}

func (s *ServiceService) Update(ctx context.Context, service *models.Service) error {
	return s.repo.Update(ctx, service)
}

func (s *ServiceService) Delete(ctx context.Context, id string) error {
	parsedID, err := uuid.Parse(id)
	if err != nil {
		return err
	}
	return s.repo.Delete(ctx, parsedID)
}
