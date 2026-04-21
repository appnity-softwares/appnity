package api

import (
	"appnity-backend/internal/services"
	"github.com/gofiber/fiber/v2"
)

type BlogHandler struct {
	service *services.BlogService
}

func NewBlogHandler(service *services.BlogService) *BlogHandler {
	return &BlogHandler{service: service}
}

func (h *BlogHandler) GetAll(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)

	posts, total, err := h.service.GetAll(c.Context(), page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": "Failed to fetch posts"})
	}
	return c.JSON(fiber.Map{"success": true, "data": posts, "total": total})
}

func (h *BlogHandler) GetBySlug(c *fiber.Ctx) error {
	slug := c.Params("slug")
	post, err := h.service.GetBySlug(c.Context(), slug)
	if err != nil || post == nil {
		return c.Status(404).JSON(fiber.Map{"error": "Post not found"})
	}
	return c.JSON(post)
}
