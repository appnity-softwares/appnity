package api

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/services"
	"github.com/gofiber/fiber/v2"
)

type SubscriberHandler struct {
	service *services.SubscriberService
}

func NewSubscriberHandler(service *services.SubscriberService) *SubscriberHandler {
	return &SubscriberHandler{service: service}
}

func (h *SubscriberHandler) Subscribe(c *fiber.Ctx) error {
	var req models.NewsletterRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid email"})
	}

	source := c.Query("source", "footer")

	if err := h.service.Subscribe(c.Context(), req.Email, source); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": err.Error()})
	}

	return c.Status(201).JSON(fiber.Map{
		"success": true,
		"message": "Welcome aboard! You'll receive our latest updates.",
	})
}

func (h *SubscriberHandler) Unsubscribe(c *fiber.Ctx) error {
	var req struct {
		Email string `json:"email"`
	}

	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}

	if err := h.service.Unsubscribe(c.Context(), req.Email); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to unsubscribe"})
	}

	return c.JSON(fiber.Map{
		"success": true,
		"message": "You've been unsubscribed.",
	})
}
