package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"context"
	"errors"
)

type SubscriberService struct {
	repo *repository.SubscriberRepository
}

func NewSubscriberService(repo *repository.SubscriberRepository) *SubscriberService {
	return &SubscriberService{repo: repo}
}

func (s *SubscriberService) Subscribe(ctx context.Context, email, source string) error {
	// Check if already subscribed
	existing, _ := s.repo.FindByEmail(ctx, email)
	if existing != nil {
		if existing.Status == "active" {
			return errors.New("already subscribed")
		}
		// Reactivate
		existing.Status = "active"
		return nil
	}

	subscriber := &models.Subscriber{
		Email:  email,
		Status: "active",
		Source: source,
	}
	return s.repo.Create(ctx, subscriber)
}

func (s *SubscriberService) Unsubscribe(ctx context.Context, email string) error {
	return s.repo.Unsubscribe(ctx, email)
}

func (s *SubscriberService) GetAll(ctx context.Context) ([]models.Subscriber, error) {
	return s.repo.GetAll(ctx)
}

func (s *SubscriberService) Count(ctx context.Context) (int, error) {
	return s.repo.Count(ctx)
}
