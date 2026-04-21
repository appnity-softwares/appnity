package api

import (
	"appnity-backend/internal/services"
	"github.com/gofiber/fiber/v2"
)

type JobHandler struct {
	service *services.JobService
}

func NewJobHandler(service *services.JobService) *JobHandler {
	return &JobHandler{service: service}
}

func (h *JobHandler) GetAll(c *fiber.Ctx) error {
	jobs, err := h.service.GetAll(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to fetch jobs"})
	}
	return c.JSON(fiber.Map{"success": true, "data": jobs})
}

func (h *JobHandler) GetBySlug(c *fiber.Ctx) error {
	slug := c.Params("slug")
	job, err := h.service.GetBySlug(c.Context(), slug)
	if err != nil || job == nil {
		return c.Status(404).JSON(fiber.Map{"error": "Job not found"})
	}
	return c.JSON(job)
}
