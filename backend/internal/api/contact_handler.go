package api

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/services"
	"github.com/gofiber/fiber/v2"
)

type ContactHandler struct {
	service *services.ContactService
}

func NewContactHandler(service *services.ContactService) *ContactHandler {
	return &ContactHandler{service: service}
}

func (h *ContactHandler) Submit(c *fiber.Ctx) error {
	var req models.ContactRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	inquiry := &models.ContactInquiry{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Message:   req.Message,
		Status:    "new",
		Priority:  "normal",
	}

	if err := h.service.Create(c.Context(), inquiry); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to submit inquiry"})
	}

	return c.Status(201).JSON(fiber.Map{
		"success": true,
		"message": "Thank you for your message! We'll get back to you soon.",
	})
}
