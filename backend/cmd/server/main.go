package main

import (
	"log"
	"os"

	"appnity-backend/internal/api"
	"appnity-backend/internal/api/middleware"
	"appnity-backend/internal/repository"
	"appnity-backend/internal/services"
	"appnity-backend/internal/websocket"
	"appnity-backend/pkg/auth"
	"appnity-backend/pkg/database"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/template/html/v2"
	"github.com/joho/godotenv"
	"strings"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Connect to database
	db, err := database.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Run migrations
	if err := database.RunMigrations(db); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize repositories
	userRepo := repository.NewUserRepository(db)
	projectRepo := repository.NewProjectRepository(db)
	blogRepo := repository.NewBlogRepository(db)
	jobRepo := repository.NewJobRepository(db)
	contactRepo := repository.NewContactRepository(db)
	subscriberRepo := repository.NewSubscriberRepository(db)
	faqRepo := repository.NewFAQRepository(db)
	serviceRepo := repository.NewServiceRepository(db)
	pricingRepo := repository.NewPricingRepository(db)
	settingsRepo := repository.NewSettingsRepository(db)

	// Initialize services
	authService := services.NewAuthService(userRepo)
	projectService := services.NewProjectService(projectRepo)
	blogService := services.NewBlogService(blogRepo)
	jobService := services.NewJobService(jobRepo)
	contactService := services.NewContactService(contactRepo)
	subscriberService := services.NewSubscriberService(subscriberRepo)
	faqService := services.NewFAQService(faqRepo)
	serviceService := services.NewServiceService(serviceRepo)
	pricingService := services.NewPricingService(pricingRepo)
	settingsService := services.NewSettingsService(settingsRepo)

	// Initialize JWT manager
	jwtManager := auth.NewJWTManager(
		os.Getenv("JWT_SECRET"),
		os.Getenv("JWT_REFRESH_SECRET"),
	)

	// Initialize WebSocket hub
	hub := websocket.NewHub()
	go hub.Run()

	// Create Fiber app with HTML templates
	cwd, _ := os.Getwd()
	log.Printf("Current working directory: %s", cwd)

	engine := html.New("./admin/views", ".html")
	engine.AddFunc("contains", func(s interface{}, substr string) bool {
		str, ok := s.(string)
		if !ok {
			return false
		}
		return strings.Contains(str, substr)
	})

	// engine.Reload(true) // Optional: for development

	app := fiber.New(fiber.Config{
		AppName:     "Appnity Backend v1.0",
		Views:       engine,
		ViewsLayout: "layout",
	})

	// Middleware
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     os.Getenv("ALLOWED_ORIGINS"),
		AllowMethods:     "GET,POST,PUT,DELETE,PATCH,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept,Authorization,X-CSRF-Token",
		AllowCredentials: true,
	}))

	// Initialize handlers
	authHandler := api.NewAuthHandler(authService, jwtManager)
	projectHandler := api.NewProjectHandler(projectService)
	blogHandler := api.NewBlogHandler(blogService)
	jobHandler := api.NewJobHandler(jobService)
	contactHandler := api.NewContactHandler(contactService)
	subscriberHandler := api.NewSubscriberHandler(subscriberService)
	faqHandler := api.NewFAQHandler(faqService)
	serviceHandler := api.NewServiceHandler(serviceService)
	pricingHandler := api.NewPricingHandler(pricingService)
	settingsHandler := api.NewSettingsHandler(settingsService)
	adminHandler := api.NewAdminHandler(
		authService, jwtManager,
		projectService, blogService, jobService,
		contactService, subscriberService, faqService,
		serviceService, pricingService, settingsService,
	)
	adminAPIHandler := api.NewAdminAPIHandler(
		projectService, blogService, jobService,
		contactService, subscriberService, faqService, serviceService,
		pricingService, settingsService, authService,
	)

	// Admin middleware
	adminAuth := middleware.NewAdminAuth(jwtManager)

	// Public routes
	api.SetupPublicRoutes(app,
		authHandler, projectHandler, blogHandler, jobHandler,
		contactHandler, subscriberHandler, faqHandler,
		serviceHandler, pricingHandler, settingsHandler,
	)

	// Auth routes
	api.SetupAuthRoutes(app, authHandler)

	// Protected API routes (requires auth)
	api.SetupProtectedRoutes(app, adminAuth, adminAPIHandler)

	// SSE for real-time updates
	app.Get("/api/v1/events", hub.HandleSSE)

	// Health check
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok"})
	})

	// Admin panel routes - public
	app.Get("/admin/login", func(c *fiber.Ctx) error {
		return c.Render("login", fiber.Map{"Title": "Admin Login"}, "")
	})

	// Admin panel routes - protected
	admin := app.Group("/admin")
	admin.Use(adminAuth.RequireAuth())
	admin.Use(middleware.AdminOnly())
	api.SetupAdminRoutes(admin, adminHandler)

	// Serve admin static files
	app.Static("/admin/static", "./admin/static")

	// Start server
	go func() {
		port := os.Getenv("PORT")
		if port == "" {
			port = "8080"
		}
		log.Printf("Starting server on port %s", port)
		if err := app.Listen(":" + port); err != nil {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Keep server running - simple blocking
	log.Println("Server running. Press Ctrl+C to stop.")
	select {}
}
