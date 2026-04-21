package api

import (
	"appnity-backend/internal/api/middleware"
	"appnity-backend/internal/services"
	"appnity-backend/pkg/auth"
	"github.com/gofiber/fiber/v2"
)

type AdminHandler struct {
	authService       *services.AuthService
	jwtManager        *auth.JWTManager
	projectService    *services.ProjectService
	blogService       *services.BlogService
	jobService        *services.JobService
	contactService    *services.ContactService
	subscriberService *services.SubscriberService
	faqService        *services.FAQService
	serviceService    *services.ServiceService
	pricingService    *services.PricingService
	settingsService   *services.SettingsService
}

func NewAdminHandler(
	authService *services.AuthService, jwtManager *auth.JWTManager,
	projectService *services.ProjectService, blogService *services.BlogService,
	jobService *services.JobService, contactService *services.ContactService,
	subscriberService *services.SubscriberService, faqService *services.FAQService,
	serviceService *services.ServiceService, pricingService *services.PricingService,
	settingsService *services.SettingsService,
) *AdminHandler {
	return &AdminHandler{
		authService:       authService,
		jwtManager:        jwtManager,
		projectService:    projectService,
		blogService:       blogService,
		jobService:        jobService,
		contactService:    contactService,
		subscriberService: subscriberService,
		faqService:        faqService,
		serviceService:    serviceService,
		pricingService:    pricingService,
		settingsService:   settingsService,
	}
}

func (h *AdminHandler) Dashboard(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Dashboard",
		"PageKey":     "dashboard",
		"PageHeading": "Loading dashboard data...",
		"PageHint":    "Overview, inquiries, and collection metrics are being prepared.",
	}, "")
}

func (h *AdminHandler) Projects(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Projects",
		"PageKey":     "projects",
		"PageHeading": "Loading portfolio manager...",
		"PageHint":    "Project records, featured flags, publishing state, and sorting controls will appear here.",
	}, "")
}

func (h *AdminHandler) Blog(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Blog",
		"PageKey":     "blog",
		"PageHeading": "Loading blog manager...",
		"PageHint":    "Post drafts, featured stories, authors, and publishing controls will appear here.",
	}, "")
}

func (h *AdminHandler) Jobs(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Jobs",
		"PageKey":     "jobs",
		"PageHeading": "Loading hiring manager...",
		"PageHint":    "Roles, team ownership, benefits, and application state controls will appear here.",
	}, "")
}

func (h *AdminHandler) Inquiries(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Inquiries",
		"PageKey":     "inquiries",
		"PageHeading": "Loading inquiry inbox...",
		"PageHint":    "New leads, message details, and review actions will appear here.",
	}, "")
}

func (h *AdminHandler) Subscribers(c *fiber.Ctx) error {
	return c.Redirect("/admin/settings")
}

func (h *AdminHandler) Settings(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Settings",
		"PageKey":     "settings",
		"PageHeading": "Loading system settings...",
		"PageHint":    "SEO defaults, admin security, and account-level configuration will appear here.",
	}, "")
}

func (h *AdminHandler) FAQs(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "FAQs",
		"PageKey":     "faqs",
		"PageHeading": "Loading FAQ manager...",
		"PageHint":    "Questions, answers, categories, and sorting controls will appear here.",
	}, "")
}

func (h *AdminHandler) Services(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Services",
		"PageKey":     "services",
		"PageHeading": "Loading services manager...",
		"PageHint":    "Service cards, features, icons, and category ordering will appear here.",
	}, "")
}

func (h *AdminHandler) Pricing(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Pricing",
		"PageKey":     "pricing",
		"PageHeading": "Loading pricing manager...",
		"PageHint":    "Pricing tiers, display amounts, featured plans, and website visibility will appear here.",
	}, "")
}

func (h *AdminHandler) Content(c *fiber.Ctx) error {
	return c.Render("shell", fiber.Map{
		"Title":       "Content",
		"PageKey":     "content",
		"PageHeading": "Loading dynamic website content...",
		"PageHint":    "Brand, homepage, footer, testimonials, and structured website content settings will appear here.",
	}, "")
}

func (h *AdminHandler) LoginPage(c *fiber.Ctx) error {
	return c.Render("login", fiber.Map{"Title": "Admin Login"})
}

func SetupPublicRoutes(app *fiber.App,
	authHandler *AuthHandler,
	projectHandler *ProjectHandler,
	blogHandler *BlogHandler,
	jobHandler *JobHandler,
	contactHandler *ContactHandler,
	subscriberHandler *SubscriberHandler,
	faqHandler *FAQHandler,
	serviceHandler *ServiceHandler,
	pricingHandler *PricingHandler,
	settingsHandler *SettingsHandler,
) {
	api := app.Group("/api/v1")

	api.Get("/projects", projectHandler.GetAll)
	api.Get("/projects/:slug", projectHandler.GetBySlug)
	api.Get("/projects/categories", projectHandler.GetCategories)

	api.Get("/blog", blogHandler.GetAll)
	api.Get("/blog/:slug", blogHandler.GetBySlug)

	api.Get("/jobs", jobHandler.GetAll)
	api.Get("/jobs/:slug", jobHandler.GetBySlug)

	api.Get("/faqs", faqHandler.GetAll)
	api.Get("/services", serviceHandler.GetAll)
	api.Get("/pricing", pricingHandler.GetAll)
	api.Get("/settings", settingsHandler.GetAll)

	api.Post("/contact", contactHandler.Submit)
	api.Post("/subscribe", subscriberHandler.Subscribe)
}

func SetupAuthRoutes(app *fiber.App, authHandler *AuthHandler) {
	api := app.Group("/api/v1/auth")
	api.Post("/login", authHandler.Login)
	api.Post("/register", authHandler.Register)
	api.Post("/logout", authHandler.Logout)
	api.Post("/forgot-password", authHandler.ForgotPassword)
	api.Post("/reset-password", authHandler.ResetPassword)
	api.Get("/me", authHandler.Me)
}

func SetupProtectedRoutes(app *fiber.App, adminAuth *middleware.AdminAuth, adminAPIHandler *AdminAPIHandler) {
	api := app.Group("/api/v1/admin")
	api.Use(adminAuth.RequireAuth())

	api.Get("/dashboard", adminAPIHandler.GetDashboardStats)
	api.Get("/projects", adminAPIHandler.ListProjects)
	api.Post("/projects", adminAPIHandler.CreateProject)
	api.Put("/projects/:id", adminAPIHandler.UpdateProject)
	api.Delete("/projects/:id", adminAPIHandler.DeleteProject)

	api.Get("/blog", adminAPIHandler.ListBlog)
	api.Post("/blog", adminAPIHandler.CreateBlog)
	api.Put("/blog/:id", adminAPIHandler.UpdateBlog)
	api.Delete("/blog/:id", adminAPIHandler.DeleteBlog)

	api.Get("/jobs", adminAPIHandler.ListJobs)
	api.Post("/jobs", adminAPIHandler.CreateJob)
	api.Put("/jobs/:id", adminAPIHandler.UpdateJob)
	api.Delete("/jobs/:id", adminAPIHandler.DeleteJob)

	api.Get("/inquiries", adminAPIHandler.ListInquiries)
	api.Put("/inquiries/:id", adminAPIHandler.UpdateInquiry)
	api.Delete("/inquiries/:id", adminAPIHandler.DeleteInquiry)

	api.Get("/subscribers", adminAPIHandler.ListSubscribers)
	api.Post("/subscribers/unsubscribe", adminAPIHandler.Unsubscribe)

	api.Get("/settings", adminAPIHandler.GetSettings)
	api.Put("/settings", adminAPIHandler.UpdateSettings)
	api.Put("/password", adminAPIHandler.ChangePassword)

	api.Get("/faqs", adminAPIHandler.ListFAQs)
	api.Post("/faqs", adminAPIHandler.CreateFAQ)
	api.Put("/faqs/:id", adminAPIHandler.UpdateFAQ)
	api.Delete("/faqs/:id", adminAPIHandler.DeleteFAQ)

	api.Get("/services", adminAPIHandler.ListServices)
	api.Post("/services", adminAPIHandler.CreateService)
	api.Put("/services/:id", adminAPIHandler.UpdateService)
	api.Delete("/services/:id", adminAPIHandler.DeleteService)

	api.Get("/pricing", adminAPIHandler.ListPricing)
	api.Post("/pricing", adminAPIHandler.CreatePricing)
	api.Put("/pricing/:id", adminAPIHandler.UpdatePricing)
	api.Delete("/pricing/:id", adminAPIHandler.DeletePricing)
}

func SetupAdminRoutes(admin fiber.Router, handler *AdminHandler) {
	admin.Get("/logout", func(c *fiber.Ctx) error {
		c.ClearCookie("token")
		return c.Redirect("/admin/login")
	})
	admin.Get("/", handler.Dashboard)
	admin.Get("/projects", handler.Projects)
	admin.Get("/blog", handler.Blog)
	admin.Get("/jobs", handler.Jobs)
	admin.Get("/inquiries", handler.Inquiries)
	admin.Get("/faqs", handler.FAQs)
	admin.Get("/services", handler.Services)
	admin.Get("/pricing", handler.Pricing)
	admin.Get("/content", handler.Content)
	admin.Get("/settings", handler.Settings)
	admin.Get("/subscribers", handler.Subscribers)
}
