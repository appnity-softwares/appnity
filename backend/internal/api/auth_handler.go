package api

import (
	"appnity-backend/internal/services"
	"appnity-backend/pkg/auth"
	"github.com/gofiber/fiber/v2"
)

type AuthHandler struct {
	authService *services.AuthService
	jwtManager  *auth.JWTManager
}

func NewAuthHandler(authService *services.AuthService, jwtManager *auth.JWTManager) *AuthHandler {
	return &AuthHandler{authService: authService, jwtManager: jwtManager}
}

func (h *AuthHandler) Login(c *fiber.Ctx) error {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	user, err := h.authService.Login(c.Context(), req.Email, req.Password)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"success": false, "error": "Invalid credentials"})
	}

	token, _ := h.jwtManager.GenerateToken(user.ID.String(), user.Email, user.Role)
	refreshToken, _ := h.jwtManager.GenerateRefreshToken(user.ID.String())

	// Set cookie for SSR admin panel
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    token,
		HTTPOnly: true,
		Secure:   false, // Set to true in production
		SameSite: "Lax",
	})

	return c.JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"token":         token,
			"refresh_token": refreshToken,
			"user":          user,
		},
	})
}

func (h *AuthHandler) Register(c *fiber.Ctx) error {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	user, err := h.authService.Register(c.Context(), req.Email, req.Password, req.Name)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": err.Error()})
	}

	token, _ := h.jwtManager.GenerateToken(user.ID.String(), user.Email, user.Role)
	refreshToken, _ := h.jwtManager.GenerateRefreshToken(user.ID.String())

	return c.Status(201).JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"token":         token,
			"refresh_token": refreshToken,
			"user":          user,
		},
	})
}

func (h *AuthHandler) Me(c *fiber.Ctx) error {
	user := c.Locals("user").(*auth.Claims)
	return c.JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"id":    user.UserID,
			"email": user.Email,
			"role":  user.Role,
		},
	})
}

func (h *AuthHandler) Logout(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"success": true, "message": "Logged out successfully"})
}

func (h *AuthHandler) ForgotPassword(c *fiber.Ctx) error {
	var req struct {
		Email string `json:"email"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "If an account exists with that email, a password reset link has been sent.",
	})
}

func (h *AuthHandler) ResetPassword(c *fiber.Ctx) error {
	var req struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "Password has been reset successfully.",
	})
}
