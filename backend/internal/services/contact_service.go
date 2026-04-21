package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"context"

	"github.com/google/uuid"
)

type ContactService struct {
	repo *repository.ContactRepository
}

func NewContactService(repo *repository.ContactRepository) *ContactService {
	return &ContactService{repo: repo}
}

func (s *ContactService) Create(ctx context.Context, inquiry *models.ContactInquiry) error {
	return s.repo.Create(ctx, inquiry)
}

func (s *ContactService) GetAll(ctx context.Context, status string) ([]models.ContactInquiry, error) {
	return s.repo.GetAll(ctx, status)
}

func (s *ContactService) Update(ctx context.Context, inquiry *models.ContactInquiry) error {
	return s.repo.Update(ctx, inquiry)
}

func (s *ContactService) Delete(ctx context.Context, id string) error {
	parsedID, err := uuid.Parse(id)
	if err != nil {
		return err
	}
	return s.repo.Delete(ctx, parsedID)
}

func (s *ContactService) CountByStatus(ctx context.Context, status string) (int, error) {
	return s.repo.CountByStatus(ctx, status)
}
