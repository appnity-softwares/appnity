package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"context"
)

type ProjectService struct {
	repo *repository.ProjectRepository
}

func NewProjectService(repo *repository.ProjectRepository) *ProjectService {
	return &ProjectService{repo: repo}
}

func (s *ProjectService) GetAll(ctx context.Context, category string) ([]models.Project, error) {
	return s.repo.GetAll(ctx, category)
}

func (s *ProjectService) ListAll(ctx context.Context) ([]models.Project, error) {
	return s.repo.ListAll(ctx)
}

func (s *ProjectService) GetBySlug(ctx context.Context, slug string) (*models.Project, error) {
	return s.repo.GetBySlug(ctx, slug)
}

func (s *ProjectService) Create(ctx context.Context, project *models.Project) error {
	return s.repo.Create(ctx, project)
}

func (s *ProjectService) Update(ctx context.Context, project *models.Project) error {
	return s.repo.Update(ctx, project)
}

func (s *ProjectService) Delete(ctx context.Context, id string) error {
	// Implement delete by ID
	return nil
}

func (s *ProjectService) GetCategories(ctx context.Context) ([]string, error) {
	return s.repo.GetCategories(ctx)
}
