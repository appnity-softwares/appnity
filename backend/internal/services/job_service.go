package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"context"
)

type JobService struct {
	repo *repository.JobRepository
}

func NewJobService(repo *repository.JobRepository) *JobService {
	return &JobService{repo: repo}
}

func (s *JobService) GetAll(ctx context.Context) ([]models.Job, error) {
	return s.repo.GetAll(ctx)
}

func (s *JobService) ListAll(ctx context.Context) ([]models.Job, error) {
	return s.repo.ListAll(ctx)
}

func (s *JobService) GetBySlug(ctx context.Context, slug string) (*models.Job, error) {
	return s.repo.GetBySlug(ctx, slug)
}

func (s *JobService) Create(ctx context.Context, job *models.Job) error {
	return s.repo.Create(ctx, job)
}

func (s *JobService) Update(ctx context.Context, job *models.Job) error {
	return s.repo.Update(ctx, job)
}

func (s *JobService) Delete(ctx context.Context, id string) error {
	return nil
}
