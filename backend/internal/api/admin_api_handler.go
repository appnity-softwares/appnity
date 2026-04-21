package api

import (
	"appnity-backend/internal/models"
	"appnity-backend/internal/services"
	"appnity-backend/pkg/auth"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type AdminAPIHandler struct {
	projectService    *services.ProjectService
	blogService       *services.BlogService
	jobService        *services.JobService
	contactService    *services.ContactService
	subscriberService *services.SubscriberService
	faqService        *services.FAQService
	serviceService    *services.ServiceService
	pricingService    *services.PricingService
	settingsService   *services.SettingsService
	authService       *services.AuthService
}

func NewAdminAPIHandler(
	projectService *services.ProjectService,
	blogService *services.BlogService,
	jobService *services.JobService,
	contactService *services.ContactService,
	subscriberService *services.SubscriberService,
	faqService *services.FAQService,
	serviceService *services.ServiceService,
	pricingService *services.PricingService,
	settingsService *services.SettingsService,
	authService *services.AuthService,
) *AdminAPIHandler {
	return &AdminAPIHandler{
		projectService:    projectService,
		blogService:       blogService,
		jobService:        jobService,
		contactService:    contactService,
		subscriberService: subscriberService,
		faqService:        faqService,
		serviceService:    serviceService,
		pricingService:    pricingService,
		settingsService:   settingsService,
		authService:       authService,
	}
}

func (h *AdminAPIHandler) GetDashboardStats(c *fiber.Ctx) error {
	projects, _ := h.projectService.ListAll(c.Context())
	blogs, _ := h.blogService.ListAll(c.Context())
	jobs, _ := h.jobService.ListAll(c.Context())
	subs, _ := h.subscriberService.GetAll(c.Context())
	inquiries, _ := h.contactService.GetAll(c.Context(), "new")

	activeJobs := 0
	for _, j := range jobs {
		if j.IsActive {
			activeJobs++
		}
	}

	return c.JSON(fiber.Map{
		"success": true,
		"data": fiber.Map{
			"total_projects":    len(projects),
			"total_blog_posts":  len(blogs),
			"active_jobs":       activeJobs,
			"total_subscribers": len(subs),
			"new_inquiries":     len(inquiries),
		},
	})
}

func (h *AdminAPIHandler) ListProjects(c *fiber.Ctx) error {
	projects, err := h.projectService.ListAll(c.Context())
	if err != nil {
		return c.JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": projects})
}

func (h *AdminAPIHandler) CreateProject(c *fiber.Ctx) error {
	var project models.Project
	if err := c.BodyParser(&project); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if err := h.projectService.Create(c.Context(), &project); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": project})
}

func (h *AdminAPIHandler) UpdateProject(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := uuid.Parse(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid ID"})
	}

	var project models.Project
	if err := c.BodyParser(&project); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	if err := h.projectService.Update(c.Context(), &project); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": project})
}

func (h *AdminAPIHandler) DeleteProject(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := h.projectService.Delete(c.Context(), id); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Project deleted"})
}

func (h *AdminAPIHandler) ListBlog(c *fiber.Ctx) error {
	posts, err := h.blogService.ListAll(c.Context())
	if err != nil {
		return c.JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": posts})
}

func (h *AdminAPIHandler) CreateBlog(c *fiber.Ctx) error {
	var post models.BlogPost
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if err := h.blogService.Create(c.Context(), &post); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": post})
}

func (h *AdminAPIHandler) UpdateBlog(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := uuid.Parse(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid ID"})
	}

	var post models.BlogPost
	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	if err := h.blogService.Update(c.Context(), &post); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": post})
}

func (h *AdminAPIHandler) DeleteBlog(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := h.blogService.Delete(c.Context(), id); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Post deleted"})
}

func (h *AdminAPIHandler) ListJobs(c *fiber.Ctx) error {
	jobs, err := h.jobService.ListAll(c.Context())
	if err != nil {
		return c.JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": jobs})
}

func (h *AdminAPIHandler) CreateJob(c *fiber.Ctx) error {
	var job models.Job
	if err := c.BodyParser(&job); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if err := h.jobService.Create(c.Context(), &job); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": job})
}

func (h *AdminAPIHandler) UpdateJob(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := uuid.Parse(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid ID"})
	}

	var job models.Job
	if err := c.BodyParser(&job); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	if err := h.jobService.Update(c.Context(), &job); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": job})
}

func (h *AdminAPIHandler) DeleteJob(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := h.jobService.Delete(c.Context(), id); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Job deleted"})
}

func (h *AdminAPIHandler) ListInquiries(c *fiber.Ctx) error {
	inquiries, err := h.contactService.GetAll(c.Context(), "")
	if err != nil {
		return c.JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": inquiries})
}

func (h *AdminAPIHandler) UpdateInquiry(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := uuid.Parse(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid ID"})
	}

	var inquiry models.ContactInquiry
	if err := c.BodyParser(&inquiry); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	if err := h.contactService.Update(c.Context(), &inquiry); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": inquiry})
}

func (h *AdminAPIHandler) DeleteInquiry(c *fiber.Ctx) error {
	id := c.Params("id")
	if _, err := uuid.Parse(id); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid ID"})
	}

	if err := h.contactService.Delete(c.Context(), id); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Inquiry deleted"})
}

func (h *AdminAPIHandler) ListSubscribers(c *fiber.Ctx) error {
	subs, err := h.subscriberService.GetAll(c.Context())
	if err != nil {
		return c.JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": subs})
}

func (h *AdminAPIHandler) Unsubscribe(c *fiber.Ctx) error {
	var req struct {
		Email string `json:"email"`
	}
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	if err := h.subscriberService.Unsubscribe(c.Context(), req.Email); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Unsubscribed"})
}

func (h *AdminAPIHandler) GetSettings(c *fiber.Ctx) error {
	settings, err := h.settingsService.GetAll(c.Context())
	if err != nil {
		return c.JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": settings})
}

func (h *AdminAPIHandler) UpdateSettings(c *fiber.Ctx) error {
	var settings map[string]any
	if err := c.BodyParser(&settings); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}

	for key, value := range settings {
		if err := h.settingsService.Set(c.Context(), key, value); err != nil {
			return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
		}
	}
	return c.JSON(fiber.Map{"success": true, "message": "Settings updated"})
}

func (h *AdminAPIHandler) ListFAQs(c *fiber.Ctx) error {
	faqs, err := h.faqService.ListAll(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": faqs})
}

func (h *AdminAPIHandler) CreateFAQ(c *fiber.Ctx) error {
	var faq models.FAQ
	if err := c.BodyParser(&faq); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if err := h.faqService.Create(c.Context(), &faq); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": faq})
}

func (h *AdminAPIHandler) UpdateFAQ(c *fiber.Ctx) error {
	var faq models.FAQ
	if err := c.BodyParser(&faq); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if parsedID, err := uuid.Parse(c.Params("id")); err == nil {
		faq.ID = parsedID
	}
	if err := h.faqService.Update(c.Context(), &faq); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": faq})
}

func (h *AdminAPIHandler) DeleteFAQ(c *fiber.Ctx) error {
	if err := h.faqService.Delete(c.Context(), c.Params("id")); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "FAQ deleted"})
}

func (h *AdminAPIHandler) ListServices(c *fiber.Ctx) error {
	servicesList, err := h.serviceService.ListAll(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": servicesList})
}

func (h *AdminAPIHandler) CreateService(c *fiber.Ctx) error {
	var service models.Service
	if err := c.BodyParser(&service); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if err := h.serviceService.Create(c.Context(), &service); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": service})
}

func (h *AdminAPIHandler) UpdateService(c *fiber.Ctx) error {
	var service models.Service
	if err := c.BodyParser(&service); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if parsedID, err := uuid.Parse(c.Params("id")); err == nil {
		service.ID = parsedID
	}
	if err := h.serviceService.Update(c.Context(), &service); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": service})
}

func (h *AdminAPIHandler) DeleteService(c *fiber.Ctx) error {
	if err := h.serviceService.Delete(c.Context(), c.Params("id")); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Service deleted"})
}

func (h *AdminAPIHandler) ListPricing(c *fiber.Ctx) error {
	tiers, err := h.pricingService.ListAll(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": tiers})
}

func (h *AdminAPIHandler) CreatePricing(c *fiber.Ctx) error {
	var tier models.PricingTier
	if err := c.BodyParser(&tier); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if err := h.pricingService.Create(c.Context(), &tier); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": tier})
}

func (h *AdminAPIHandler) UpdatePricing(c *fiber.Ctx) error {
	var tier models.PricingTier
	if err := c.BodyParser(&tier); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if parsedID, err := uuid.Parse(c.Params("id")); err == nil {
		tier.ID = parsedID
	}
	if err := h.pricingService.Update(c.Context(), &tier); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": tier})
}

func (h *AdminAPIHandler) DeletePricing(c *fiber.Ctx) error {
	if err := h.pricingService.Delete(c.Context(), c.Params("id")); err != nil {
		return c.Status(500).JSON(fiber.Map{"success": false, "error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Pricing tier deleted"})
}

func (h *AdminAPIHandler) ChangePassword(c *fiber.Ctx) error {
	var req struct {
		CurrentPassword string `json:"current_password"`
		NewPassword     string `json:"new_password"`
	}
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "Invalid request"})
	}
	if len(req.NewPassword) < 8 {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": "New password must be at least 8 characters"})
	}

	user := c.Locals("user")
	claims, ok := user.(*auth.Claims)
	if !ok || claims == nil {
		return c.Status(401).JSON(fiber.Map{"success": false, "error": "Unauthorized"})
	}

	if err := h.authService.ChangePassword(c.Context(), claims.UserID, req.CurrentPassword, req.NewPassword); err != nil {
		return c.Status(400).JSON(fiber.Map{"success": false, "error": err.Error()})
	}

	return c.JSON(fiber.Map{"success": true, "message": "Password changed"})
}
