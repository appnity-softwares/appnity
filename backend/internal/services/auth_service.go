package services

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/repository"
	"appnity-backend/pkg/auth"
	"context"
	"errors"

	"github.com/google/uuid"
)

type AuthService struct {
	userRepo *repository.UserRepository
}

func NewAuthService(userRepo *repository.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

func (s *AuthService) Register(ctx context.Context, email, password, name string) (*models.User, error) {
	// Check if user exists
	existing, _ := s.userRepo.FindByEmail(ctx, email)
	if existing != nil {
		return nil, errors.New("email already registered")
	}

	// Hash password
	hash, err := auth.HashPassword(password)
	if err != nil {
		return nil, err
	}

	user := &models.User{
		Email:        email,
		PasswordHash: hash,
		Name:         name,
		Role:         "user",
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		return nil, err
	}

	return user, nil
}

func (s *AuthService) Login(ctx context.Context, email, password string) (*models.User, error) {
	user, err := s.userRepo.FindByEmail(ctx, email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("invalid credentials")
	}

	if !auth.CheckPassword(password, user.PasswordHash) {
		return nil, errors.New("invalid credentials")
	}

	return user, nil
}

func (s *AuthService) GetUser(ctx context.Context, id string) (*models.User, error) {
	// This would need to be implemented in repository
	return nil, nil
}

func (s *AuthService) ChangePassword(ctx context.Context, userID, currentPassword, newPassword string) error {
	parsedID, err := uuid.Parse(userID)
	if err != nil {
		return errors.New("invalid user")
	}

	user, err := s.userRepo.FindByID(ctx, parsedID)
	if err != nil || user == nil {
		return errors.New("user not found")
	}

	if !auth.CheckPassword(currentPassword, user.PasswordHash) {
		return errors.New("current password is incorrect")
	}

	passwordHash, err := auth.HashPassword(newPassword)
	if err != nil {
		return err
	}

	return s.userRepo.UpdatePassword(ctx, parsedID, passwordHash)
}
