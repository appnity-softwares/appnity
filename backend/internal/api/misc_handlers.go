package api

import (
	"appnity-backend/internal/services"
	"github.com/gofiber/fiber/v2"
)

type FAQHandler struct {
	service *services.FAQService
}

func NewFAQHandler(service *services.FAQService) *FAQHandler {
	return &FAQHandler{service: service}
}

func (h *FAQHandler) GetAll(c *fiber.Ctx) error {
	faqs, err := h.service.GetAll(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to fetch FAQs"})
	}
	return c.JSON(fiber.Map{"success": true, "data": faqs})
}

type ServiceHandler struct {
	service *services.ServiceService
}

func NewServiceHandler(service *services.ServiceService) *ServiceHandler {
	return &ServiceHandler{service: service}
}

func (h *ServiceHandler) GetAll(c *fiber.Ctx) error {
	services, err := h.service.GetAll(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to fetch services"})
	}
	return c.JSON(fiber.Map{"success": true, "data": services})
}

type PricingHandler struct {
	service *services.PricingService
}

func NewPricingHandler(service *services.PricingService) *PricingHandler {
	return &PricingHandler{service: service}
}

func (h *PricingHandler) GetAll(c *fiber.Ctx) error {
	tiers, err := h.service.GetAll(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to fetch pricing tiers"})
	}
	return c.JSON(fiber.Map{"success": true, "data": tiers})
}

type SettingsHandler struct {
	service *services.SettingsService
}

func NewSettingsHandler(service *services.SettingsService) *SettingsHandler {
	return &SettingsHandler{service: service}
}

func (h *SettingsHandler) GetAll(c *fiber.Ctx) error {
	settings, err := h.service.GetAll(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to fetch settings"})
	}
	return c.JSON(fiber.Map{"success": true, "data": settings})
}
