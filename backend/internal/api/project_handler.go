package api

import (
	"appnity-backend/internal/services"
	"github.com/gofiber/fiber/v2"
)

type ProjectHandler struct {
	service *services.ProjectService
}

func NewProjectHandler(service *services.ProjectService) *ProjectHandler {
	return &ProjectHandler{service: service}
}

func (h *ProjectHandler) GetAll(c *fiber.Ctx) error {
	category := c.Query("category", "")
	projects, err := h.service.GetAll(c.Context(), category)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to fetch projects"})
	}
	return c.JSON(fiber.Map{"success": true, "data": projects})
}

func (h *ProjectHandler) GetBySlug(c *fiber.Ctx) error {
	slug := c.Params("slug")
	project, err := h.service.GetBySlug(c.Context(), slug)
	if err != nil || project == nil {
		return c.Status(404).JSON(fiber.Map{"error": "Project not found"})
	}
	return c.JSON(project)
}

func (h *ProjectHandler) GetCategories(c *fiber.Ctx) error {
	categories, err := h.service.GetCategories(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch categories"})
	}
	return c.JSON(fiber.Map{"categories": categories})
}
