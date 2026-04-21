package services

import (
	"appnity-backend/internal/repository"
	"context"
)

type SettingsService struct {
	repo *repository.SettingsRepository
}

func NewSettingsService(repo *repository.SettingsRepository) *SettingsService {
	return &SettingsService{repo: repo}
}

func (s *SettingsService) Get(ctx context.Context, key string) (any, error) {
	return s.repo.Get(ctx, key)
}

func (s *SettingsService) GetAll(ctx context.Context) (map[string]any, error) {
	return s.repo.GetAll(ctx)
}

func (s *SettingsService) Set(ctx context.Context, key string, value any) error {
	return s.repo.Set(ctx, key, value)
}
