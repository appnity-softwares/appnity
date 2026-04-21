package database

import (
	"context"
	"log"

	"appnity-backend/pkg/auth"
	"github.com/jackc/pgx/v5/pgxpool"
)

func RunMigrations(pool *pgxpool.Pool) error {
	ctx := context.Background()

	migrations := []string{
		// Users table
		`CREATE TABLE IF NOT EXISTS users (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			email VARCHAR(255) UNIQUE NOT NULL,
			password_hash VARCHAR(255) NOT NULL,
			name VARCHAR(255) NOT NULL,
			role VARCHAR(50) DEFAULT 'user',
			avatar_url TEXT,
			email_verified BOOLEAN DEFAULT FALSE,
			reset_token VARCHAR(255),
			reset_token_expires TIMESTAMP,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)`,

		// Projects table
		`CREATE TABLE IF NOT EXISTS projects (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			slug VARCHAR(255) UNIQUE NOT NULL,
			title VARCHAR(255) NOT NULL,
			category VARCHAR(100) NOT NULL,
			client VARCHAR(255),
			description TEXT,
			duration VARCHAR(100),
			year VARCHAR(10),
			image_url TEXT,
			images JSONB DEFAULT '[]',
			tags TEXT[],
			accent_color VARCHAR(20) DEFAULT '#0052ff',
			challenge TEXT,
			solution TEXT,
			results JSONB DEFAULT '[]',
			stats JSONB DEFAULT '[]',
			is_featured BOOLEAN DEFAULT FALSE,
			is_published BOOLEAN DEFAULT TRUE,
			sort_order INTEGER DEFAULT 0,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)`,

		// Blog posts table
		`CREATE TABLE IF NOT EXISTS blog_posts (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			slug VARCHAR(255) UNIQUE NOT NULL,
			title VARCHAR(500) NOT NULL,
			excerpt TEXT,
			content TEXT,
			category VARCHAR(100),
			author_name VARCHAR(255),
			author_avatar TEXT,
			image_url TEXT,
			tags TEXT[],
			is_featured BOOLEAN DEFAULT FALSE,
			is_published BOOLEAN DEFAULT TRUE,
			view_count INTEGER DEFAULT 0,
			published_at TIMESTAMP,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)`,

		// Jobs table
		`CREATE TABLE IF NOT EXISTS jobs (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			slug VARCHAR(255) UNIQUE NOT NULL,
			title VARCHAR(255) NOT NULL,
			location VARCHAR(255),
			job_type VARCHAR(100) DEFAULT 'Full-time',
			team VARCHAR(255),
			salary_range VARCHAR(255),
			description TEXT,
			requirements JSONB DEFAULT '[]',
			responsibilities JSONB DEFAULT '[]',
			benefits JSONB DEFAULT '[]',
			is_active BOOLEAN DEFAULT TRUE,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)`,

		// Contact inquiries table
		`CREATE TABLE IF NOT EXISTS contact_inquiries (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			first_name VARCHAR(100) NOT NULL,
			last_name VARCHAR(100) NOT NULL,
			email VARCHAR(255) NOT NULL,
			phone VARCHAR(50),
			company VARCHAR(255),
			message TEXT NOT NULL,
			status VARCHAR(50) DEFAULT 'new',
			priority VARCHAR(20) DEFAULT 'normal',
			assigned_to UUID REFERENCES users(id),
			notes TEXT,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)`,

		// Subscribers table
		`CREATE TABLE IF NOT EXISTS subscribers (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			email VARCHAR(255) UNIQUE NOT NULL,
			status VARCHAR(50) DEFAULT 'active',
			source VARCHAR(100),
			confirmed_at TIMESTAMP,
			unsubscribed_at TIMESTAMP,
			created_at TIMESTAMP DEFAULT NOW()
		)`,

		// Help categories table
		`CREATE TABLE IF NOT EXISTS help_categories (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			title VARCHAR(255) NOT NULL,
			icon VARCHAR(50),
			description TEXT,
			sort_order INTEGER DEFAULT 0,
			created_at TIMESTAMP DEFAULT NOW()
		)`,

		// Help articles table
		`CREATE TABLE IF NOT EXISTS help_articles (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			slug VARCHAR(255) UNIQUE NOT NULL,
			title VARCHAR(500) NOT NULL,
			content TEXT,
			category_id UUID REFERENCES help_categories(id),
			is_published BOOLEAN DEFAULT TRUE,
			view_count INTEGER DEFAULT 0,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)`,

		// FAQs table
		`CREATE TABLE IF NOT EXISTS faqs (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			question TEXT NOT NULL,
			answer TEXT NOT NULL,
			category VARCHAR(100),
			sort_order INTEGER DEFAULT 0,
			is_active BOOLEAN DEFAULT TRUE,
			created_at TIMESTAMP DEFAULT NOW()
		)`,

		// Pricing tiers table
		`CREATE TABLE IF NOT EXISTS pricing_tiers (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			slug VARCHAR(100) UNIQUE NOT NULL,
			title VARCHAR(255) NOT NULL,
			description TEXT,
			price_amount INTEGER,
			price_display VARCHAR(50),
			features JSONB DEFAULT '[]',
			accent_color VARCHAR(20),
			bg_color VARCHAR(20),
			is_popular BOOLEAN DEFAULT FALSE,
			sort_order INTEGER DEFAULT 0,
			is_active BOOLEAN DEFAULT TRUE,
			created_at TIMESTAMP DEFAULT NOW()
		)`,

		// Services table
		`CREATE TABLE IF NOT EXISTS services (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			slug VARCHAR(100) UNIQUE NOT NULL,
			title VARCHAR(255) NOT NULL,
			description TEXT,
			icon VARCHAR(50),
			features JSONB DEFAULT '[]',
			category VARCHAR(100),
			sort_order INTEGER DEFAULT 0,
			is_active BOOLEAN DEFAULT TRUE,
			created_at TIMESTAMP DEFAULT NOW()
		)`,

		// Site settings table
		`CREATE TABLE IF NOT EXISTS site_settings (
			key VARCHAR(100) PRIMARY KEY,
			value JSONB NOT NULL,
			updated_at TIMESTAMP DEFAULT NOW()
		)`,

		// Activity log table
		`CREATE TABLE IF NOT EXISTS activity_log (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			user_id UUID REFERENCES users(id),
			action VARCHAR(100) NOT NULL,
			entity_type VARCHAR(50),
			entity_id UUID,
			details JSONB,
			ip_address INET,
			created_at TIMESTAMP DEFAULT NOW()
		)`,

		// Career applications table
		`CREATE TABLE IF NOT EXISTS career_applications (
			id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
			job_id UUID REFERENCES jobs(id),
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL,
			phone VARCHAR(50),
			cover_letter TEXT,
			resume_url TEXT,
			status VARCHAR(50) DEFAULT 'new',
			created_at TIMESTAMP DEFAULT NOW()
		)`,

		// Create indexes
		`CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category)`,
		`CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published)`,
		`CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published)`,
		`CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active)`,
		`CREATE INDEX IF NOT EXISTS idx_inquiries_status ON contact_inquiries(status)`,
		`CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status)`,
	}

	for i, migration := range migrations {
		_, err := pool.Exec(ctx, migration)
		if err != nil {
			log.Printf("Migration %d failed: %v", i+1, err)
			return err
		}
	}

	// Seed default data
	seedDefaultData(ctx, pool)

	log.Println("Migrations completed successfully")
	return nil
}

func seedDefaultData(ctx context.Context, pool *pgxpool.Pool) {
	var err error
	_ = err // avoid unused err if not used immediately

	// Seed default settings
	settings := []struct {
		key   string
		value string
	}{
		{"general", `{"site_name": "Appnity Software", "tagline": "Premium Software Development", "email": "hello@appnity.software", "phone": "+1 (555) 000-0000", "address": "123 Tech Plaza, San Francisco"}`},
		{"social", `{"twitter": "appnitysoftware", "github": "appnitysoftware", "linkedin": "appnitysoftware", "instagram": "appnitysoftware"}`},
		{"seo", `{"default_title": "Appnity Software", "default_description": "Premium software development agency"}`},
		{"testimonials", `[
			{"name": "Sarah Jenkins", "role": "CEO at TechFlow", "content": "Appnity transformed our vision into a reality. Their attention to detail and technical expertise are unmatched. The dashboard they built has become the backbone of our operations.", "avatar": "https://picsum.photos/seed/sarah/100/100", "rating": 5},
			{"name": "Michael Chen", "role": "Product Manager at GreenRoot", "content": "Working with Appnity was a game-changer for our mobile app. They didn't just code; they consulted on UX and performance, resulting in a top-tier product that our users love.", "avatar": "https://picsum.photos/seed/michael/100/100", "rating": 5},
			{"name": "Elena Rodriguez", "role": "Founder of MediaStream", "content": "The AI content engine Appnity developed for us is revolutionary. They handled the complexity of Gemini API integration flawlessly. Highly recommend for any high-end software needs.", "avatar": "https://picsum.photos/seed/elena/100/100", "rating": 5}
		]`},
		{"site_content", `{
			"brand": {
				"name": "Appnity Software",
				"short_name": "Appnity",
				"domain_label": "appnity.software",
				"eyebrow": "Digital Product Studio",
				"primary_cta_label": "Start a Project",
				"primary_cta_link": "/contact",
				"secondary_cta_label": "View Portfolio",
				"secondary_cta_link": "/portfolio"
			},
			"navigation": {
				"links": [
					{"name": "Services", "path": "/services"},
					{"name": "Portfolio", "path": "/portfolio"},
					{"name": "Pricing", "path": "/pricing"},
					{"name": "About", "path": "/about"}
				]
			},
			"home": {
				"hero": {
					"eyebrow": "Engineered for ambitious brands",
					"title_lead": "Build the future",
					"title_accent": "with product systems that scale.",
					"description": "Appnity designs, develops, and launches software platforms, mobile apps, and custom AI workflows for growth-stage teams and modern enterprises.",
					"rotating_words": ["SaaS platforms.", "mobile apps.", "AI workflows.", "customer portals."],
					"primary_cta_label": "Start a Project",
					"primary_cta_link": "/contact",
					"secondary_cta_label": "Explore Work",
					"secondary_cta_link": "/portfolio",
					"stats": [
						{"label": "Projects launched", "value": "50+"},
						{"label": "Retention rate", "value": "98%"},
						{"label": "Delivery model", "value": "Strategy to launch"}
					]
				},
				"trusted_by": {
					"headline": "Trusted by fast-moving teams across product, commerce, healthcare, and infrastructure.",
					"logos": [
						{"name": "TechFlow", "abbr": "TF"},
						{"name": "DataSync", "abbr": "DS"},
						{"name": "CloudBase", "abbr": "CB"},
						{"name": "Innovate", "abbr": "IN"},
						{"name": "ScaleUp", "abbr": "SU"}
					]
				},
				"process": {
					"eyebrow": "Delivery system",
					"title": "A transparent process built for speed and control.",
					"description": "Every engagement is designed around measurable milestones, shared visibility, and senior execution.",
					"steps": [
						{"title": "Discover", "summary": "Audit goals, users, market context, and technical constraints.", "items": ["Stakeholder workshops", "Scope mapping", "Technical planning"]},
						{"title": "Design", "summary": "Prototype flows, visual systems, and conversion paths before development.", "items": ["Wireframes", "UI direction", "Clickable prototypes"]},
						{"title": "Deliver", "summary": "Ship production-ready software with QA, launch support, and iteration loops.", "items": ["Build & QA", "Release management", "Post-launch optimization"]}
					],
					"cta_label": "Discuss Your Project",
					"cta_link": "/contact"
				},
				"expertise": {
					"eyebrow": "Capabilities",
					"title": "Multi-disciplinary product execution under one roof.",
					"description": "Strategy, UI, engineering, cloud architecture, and automation brought together in one operating model."
				},
				"showcase": {
					"eyebrow": "Engagement tracks",
					"title": "From MVPs to enterprise rebuilds.",
					"description": "Choose the track that fits your current growth stage and product ambition.",
					"tabs": [
						{"id": "web", "title": "Modern Web Apps", "description": "Scalable web platforms and internal systems with clean data architecture."},
						{"id": "mobile", "title": "Mobile Products", "description": "Cross-platform and native experiences built for retention."},
						{"id": "design", "title": "Design Systems", "description": "Brands, interfaces, and UX systems that stay consistent at scale."}
					]
				},
				"case_studies": {
					"eyebrow": "Selected work",
					"title": "Proof through shipping, not promises.",
					"description": "A few of the launches where strategy, design, and engineering translated directly into measurable outcomes.",
					"cta_label": "See Full Portfolio",
					"cta_link": "/portfolio"
				},
				"cta": {
					"eyebrow": "Ready to move?",
					"title": "Launch a sharper digital experience.",
					"description": "Tell us what you're building and we’ll shape the product roadmap, delivery scope, and execution plan around it.",
					"primary_cta_label": "Book a Discovery Call",
					"primary_cta_link": "/contact",
					"secondary_cta_label": "Review Pricing",
					"secondary_cta_link": "/pricing"
				}
			},
			"about": {
				"eyebrow": "The studio",
				"title": "Small team. Senior execution. High ownership.",
				"description": "Appnity partners with companies that need product thinking, rigorous engineering, and a delivery team that can operate with minimal hand-holding.",
				"story_title": "Why we exist",
				"story": [
					"We started Appnity to fix a common problem: businesses were buying software projects, but rarely getting product discipline, technical depth, and clarity in one package.",
					"Our model is intentionally focused. We work with a smaller number of partners so each engagement gets senior attention across discovery, design, and engineering.",
					"The outcome is not just code shipped faster. It is a product operation that makes better decisions and compounds over time."
				],
				"stats": [
					{"label": "Projects launched", "value": "50+"},
					{"label": "Client retention", "value": "98%"}
				],
				"values": [
					{"title": "Precision", "description": "Clear systems, deliberate execution, and a high bar for craft."},
					{"title": "Collaboration", "description": "We work like an embedded product team, not an outsourced ticket queue."},
					{"title": "Momentum", "description": "Fast decisions, visible progress, and delivery that keeps moving."}
				],
				"cta_label": "Talk to Appnity",
				"cta_link": "/contact"
			},
			"services": {
				"eyebrow": "What we build",
				"title": "Capability-led teams for product, platform, and growth work.",
				"description": "Use the admin panel to manage cards, order, features, and service categories without touching the frontend.",
				"cta_title": "Need a delivery partner, not just a vendor?",
				"cta_description": "We can lead discovery, delivery, and post-launch optimization across product, engineering, and design.",
				"primary_cta_label": "Start a Project",
				"primary_cta_link": "/contact",
				"secondary_cta_label": "See Case Studies",
				"secondary_cta_link": "/portfolio"
			},
			"portfolio": {
				"eyebrow": "Portfolio",
				"title": "Product launches built for measurable business change.",
				"description": "Every featured project is driven by outcomes: speed, revenue, engagement, retention, or operational efficiency.",
				"stats": [
					{"label": "Happy clients", "value": "45"},
					{"label": "Revenue influenced", "value": "₹15Cr+"}
				]
			},
			"pricing": {
				"eyebrow": "Transparent pricing",
				"title": "Pricing shaped around complexity, velocity, and product scope.",
				"description": "Use presets for fast comparisons or configure a custom estimate for your delivery model.",
				"calculator": {
					"title": "Project configurator",
					"description": "Adjust scope, integrations, and realtime requirements to estimate effort.",
					"base_web": 65000,
					"base_app": 180000,
					"page_cost": 8000,
					"section_cost": 4000,
					"realtime_cost": 85000,
					"api_cost": 25000
				}
			},
			"contact": {
				"eyebrow": "Let’s talk",
				"title": "Share the brief. We’ll shape the execution plan.",
				"description": "Send us the product goal, timeline, and delivery constraints. We’ll reply with the right engagement path.",
				"success_title": "Message sent",
				"success_description": "We’ll review the brief and reply with next steps."
			},
			"careers": {
				"eyebrow": "Careers",
				"title": "Join a team that cares about product quality.",
				"description": "We value ownership, clarity, and people who can operate across ambiguity without losing execution discipline.",
				"perks": [
					{"title": "Wellness First", "desc": "Flexible time, health coverage, and sustainable work cycles."},
					{"title": "Remote Native", "desc": "Work from anywhere with async-friendly collaboration."},
					{"title": "Growth Budget", "desc": "Annual budget for courses, books, and professional development."}
				],
				"talent_pool_title": "Don’t see the role yet?",
				"talent_pool_description": "We keep a rolling pipeline for designers, engineers, operators, and strategic builders.",
				"talent_pool_cta_label": "Join Talent Pool"
			},
			"footer": {
				"description": "Premium software development studio for product launches, platform modernization, and AI-powered digital experiences.",
				"columns": [
					{"title": "Product", "links": [{"label": "Services", "path": "/services"}, {"label": "Portfolio", "path": "/portfolio"}, {"label": "Pricing", "path": "/pricing"}]},
					{"title": "Resources", "links": [{"label": "Blog", "path": "/blog"}, {"label": "Help Center", "path": "/help"}, {"label": "Community", "path": "/community"}]},
					{"title": "Company", "links": [{"label": "About", "path": "/about"}, {"label": "Careers", "path": "/careers"}, {"label": "Contact", "path": "/contact"}]}
				],
				"legal_links": [
					{"label": "Terms of Service", "path": "/legal/terms"},
					{"label": "Privacy Policy", "path": "/legal/privacy"}
				],
				"copyright": "© 2026 Appnity Software. All rights reserved."
			}
		}`},
	}

	for _, s := range settings {
		_, err = pool.Exec(ctx, `
			INSERT INTO site_settings (key, value) 
			VALUES ($1, $2::jsonb)
			ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value

		`, s.key, s.value)

		if err != nil {
			log.Printf("Failed to seed setting %s: %v", s.key, err)
		}
	}

	// Seed Projects
	projects := []struct {
		slug        string
		title       string
		category    string
		client      string
		description string
		duration    string
		year        string
		imageURL    string
		tags        []string
		accentColor string
		challenge   string
		solution    string
		stats       []map[string]string
		featured    bool
	}{
		{"fintech-enterprise-platform", "Nexus Finance", "FinTech Platform", "Nexus Finance", "A comprehensive enterprise banking platform with real-time transaction processing, fraud detection, and AI-powered analytics dashboard.", "8 months", "2024", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800", []string{"React", "Node.js", "PostgreSQL", "AWS"}, "#6366f1", "Building a secure, scalable banking system handling 100K+ transactions daily", "Implemented microservices architecture with Kubernetes, real-time WebSocket updates, and AI fraud detection", []map[string]string{{"label": "Transactions/sec", "value": "50K+"}, {"label": "Uptime", "value": "99.99%"}}, true},
		{"healthcare-app", "MedConnect", "Digital Healthcare", "MedConnect Inc", "A telemedicine platform connecting patients with doctors through video consultations, prescription management, and health records.", "6 months", "2024", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800", []string{"React Native", "Node.js", "MongoDB", "WebRTC"}, "#10b981", "Enabling remote healthcare for 500K+ patients across 50 cities", "Built HIPAA-compliant video calling with end-to-end encryption, integrated with pharmacy APIs", []map[string]string{{"label": "Patients", "value": "500K+"}, {"label": "Consultations", "value": "1M+"}}, true},
		{"retail-ecommerce", "ShopMax", "Retail Technology", "ShopMax Retail", "A next-generation e-commerce platform with AI recommendations, AR product preview, and seamless checkout experience.", "5 months", "2024", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", []string{"Next.js", "TypeScript", "Stripe", "PostgreSQL"}, "#f59e0b", "Creating a unified shopping experience across web and mobile", "Integrated AR for product visualization, AI-powered recommendations increased conversion by 40%", []map[string]string{{"label": "Revenue", "value": "₹50Cr+"}, {"label": "Conversion", "value": "+40%"}}, true},
		{"real-estate-platform", "PropVista", "Real Estate", "PropVista Realty", "A sophisticated property listing platform with virtual tours, AI property matching, and secure transaction management.", "4 months", "2023", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800", []string{"React", "Python", "PostgreSQL", "Three.js"}, "#8b5cf6", "Revolutionizing how people buy and sell properties", "3D virtual tours, AI property matching based on preferences, smart contract integration", []map[string]string{{"label": "Properties", "value": "10K+"}, {"label": "Deals", "value": "₹200Cr"}}, false},
		{"logistics-fleet", "FleetWise", "Fleet Management", "FleetWise Logistics", "Real-time fleet tracking, fuel management, and route optimization for logistics companies.", "6 months", "2023", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800", []string{"React", "Go", "PostgreSQL", "Maps API"}, "#ec4899", "Managing 5000+ vehicles across 100+ cities", "Real-time GPS tracking, fuel theft detection, AI route optimization saving 15% fuel costs", []map[string]string{{"label": "Vehicles", "value": "5000+"}, {"label": "Fuel Saved", "value": "15%"}}, false},
		{"edtech-platform", "LearnPro", "EdTech Platform", "LearnPro Education", "An adaptive learning platform with AI-powered personalized courses, gamification, and real-time progress tracking.", "7 months", "2024", "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800", []string{"Next.js", "Python", "PostgreSQL", "TensorFlow"}, "#14b8a6", "Transforming education for 1M+ students", "AI-powered personalized learning paths, gamification increased engagement by 60%", []map[string]string{{"label": "Students", "value": "1M+"}, {"label": "Engagement", "value": "+60%"}}, false},
		{"saas-dashboard", "DataFlow", "Enterprise Platform", "DataFlow Inc", "A comprehensive data analytics dashboard with real-time visualization, custom reports, and team collaboration.", "4 months", "2023", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800", []string{"React", "D3.js", "Node.js", "PostgreSQL"}, "#0ea5e9", "Making complex data accessible and actionable", "Real-time data visualization, custom report builder, team collaboration features", []map[string]string{{"label": "Data Points", "value": "1B+"}, {"label": "Reports", "value": "50K+"}}, false},
		{"custom-webapp", "TechCorp", "Custom Infrastructure", "TechCorp Solutions", "A custom enterprise web application with workflow automation, document management, and team collaboration.", "5 months", "2024", "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800", []string{"React", "Node.js", "PostgreSQL", "AWS"}, "#f97316", "Streamlining operations for a 1000+ employee organization", "Custom workflow builder, document version control, real-time team messaging", []map[string]string{{"label": "Users", "value": "1000+"}, {"label": "Workflows", "value": "500+"}}, false},
		{"ai-vision-retail", "VisionStore", "AI Technology", "OmniRetail", "Computer vision system for real-time customer behavior analysis and heat mapping in large retail chains.", "6 months", "2025", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800", []string{"Python", "OpenCV", "TensorFlow", "AWS"}, "#4f46e5", "Tracking 1M+ customer interactions autonomously", "Deployed edge-AI cameras with 99% accuracy in object detection and path tracking", []map[string]string{{"label": "Accuracy", "value": "99%"}, {"label": "Stores", "value": "500+"}}, true},
	}

	for _, p := range projects {
		_, err = pool.Exec(ctx, `
			INSERT INTO projects (slug, title, category, client, description, duration, year, image_url, tags, accent_color, challenge, solution, stats, is_featured, is_published)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, true)
			ON CONFLICT (slug) DO UPDATE SET 
				title = EXCLUDED.title,
				category = EXCLUDED.category,
				description = EXCLUDED.description,
				image_url = EXCLUDED.image_url,
				is_featured = EXCLUDED.is_featured
		`, p.slug, p.title, p.category, p.client, p.description, p.duration, p.year, p.imageURL, p.tags, p.accentColor, p.challenge, p.solution, p.stats, p.featured)
		if err != nil {
			log.Printf("Failed to seed project %s: %v", p.title, err)
		}
	}

	// Seed Blog Posts
	blogPosts := []struct {
		slug       string
		title      string
		excerpt    string
		content    string
		category   string
		authorName string
		imageURL   string
		tags       []string
		featured   bool
	}{
		{"future-of-ai-mobile-development", "The Future of AI in Mobile App Development", "Exploring how LLMs like Gemini are revolutionizing user experiences and backend automation.", "<p>Artificial Intelligence is transforming mobile app development in unprecedented ways. From intelligent chatbots to predictive analytics, AI is becoming an integral part of every mobile application.</p><h2>The Rise of On-Device AI</h2><p>Modern smartphones now have dedicated AI chips that can process complex machine learning models locally, enabling features like real-time translation, advanced photography, and personalized user experiences.</p>", "AI & Tech", "Alex Rivera", "https://images.unsplash.com/photo-1677442136019-21780ecad9dd?w=800", []string{"AI", "Mobile", "Development"}, true},
		{"design-trends-2024", "Why High-Contrast Design is Winning in 2024", "A deep dive into the minimal aesthetic trends shifting the digital landscape.", "<p>High-contrast design has emerged as one of the most impactful visual trends of 2024. By using bold typography, striking color combinations, and strategic whitespace, designers are creating memorable digital experiences.</p><h2>Why It Works</h2><p>High-contrast designs not only look modern but also improve accessibility and readability. The stark difference between elements guides user attention naturally.</p>", "Design", "Sarah Chen", "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800", []string{"Design", "UI/UX", "Trends"}, true},
		{"scaling-saas-infrastructure", "Scaling SaaS Infrastructure for Global Access", "Best practices for architecting resilient cloud systems that handle millions of requests.", "<p>Building a SaaS platform that can scale globally requires careful planning and the right architectural decisions. In this post, we'll explore the strategies that enable handling millions of users.</p><h2>Key Strategies</h2><p>From microservices to edge computing, there are multiple approaches to ensure your platform performs reliably under heavy load.</p>", "Engineering", "Marcus Doe", "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800", []string{"SaaS", "Cloud", "Scaling"}, false},
		{"security-first-engineering", "Security-First Engineering in the Age of LLMs", "How to protect your data while integrating powerful generative models into your workflow.", "<p>As AI becomes more prevalent, ensuring the security of your applications is more important than ever.</p>", "Cybersecurity", "Jason Bourne", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800", []string{"Security", "AI", "Engineering"}, false},
		{"remote-team-performance", "Maximizing Velocity in Remote Engineering Teams", "Our blueprint for high-performance distributed development without losing technical quality.", "<p>Remote work is here to stay, but how do you maintain technical excellence in a distributed team?</p>", "Culture", "Elena Rodriguez", "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800", []string{"Remote", "Productivity", "Engineering"}, false},
	}

	for _, b := range blogPosts {
		_, err = pool.Exec(ctx, `
			INSERT INTO blog_posts (slug, title, excerpt, content, category, author_name, image_url, tags, is_featured, is_published, published_at)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, NOW())
			ON CONFLICT (slug) DO UPDATE SET 
				title = EXCLUDED.title,
				excerpt = EXCLUDED.excerpt,
				content = EXCLUDED.content,
				is_featured = EXCLUDED.is_featured
		`, b.slug, b.title, b.excerpt, b.content, b.category, b.authorName, b.imageURL, b.tags, b.featured)
		if err != nil {
			log.Printf("Failed to seed blog post %s: %v", b.title, err)
		}
	}

	// Seed Jobs
	jobs := []struct {
		slug         string
		title        string
		location     string
		jobType      string
		team         string
		salaryRange  string
		description  string
		requirements []string
		benefits     []string
		active       bool
	}{
		{"senior-product-designer", "Senior Product Designer", "Remote / Dubai", "Full-time", "Design", "$120k - $160k", "We're looking for a visionary product designer to lead our design team and create stunning user experiences.", []string{"5+ years experience", "Figma expertise", "Design systems", "User research"}, []string{"Competitive salary", "Remote-first", "Health insurance", "Learning budget"}, true},
		{"fullstack-engineer", "Fullstack Engineer (React/Node)", "Remote", "Full-time", "Engineering", "$140k - $180k", "Join our engineering team to build cutting-edge web applications using modern technologies.", []string{"3+ years React", "Node.js experience", "TypeScript", "PostgreSQL"}, []string{"Competitive equity", "Unlimited PTO", "Remote work", "Conference budget"}, true},
		{"ai-infrastructure-specialist", "AI Infrastructure Specialist", "Austin, TX / Remote", "Full-time", "Engineering", "$150k - $200k", "Help us build and optimize AI-powered features at scale.", []string{"ML infrastructure", "Python/Go", "Kubernetes", "Cloud platforms"}, []string{"Top-tier compensation", "Stock options", "Health benefits", "Relocation support"}, true},
		{"technical-product-manager", "Technical Product Manager", "London / Remote", "Full-time", "Product", "$110k - $150k", "Lead product strategy for our core platform features.", []string{"Technical background", "5+ years PM experience", "Data-driven", "Agile"}, []string{"Competitive package", "Remote flexibility", "Learning budget", "Team events"}, true},
		{"qa-automation-lead", "QA Automation Lead", "Remote", "Full-time", "Engineering", "$100k - $130k", "Lead our quality assurance efforts through automated testing strategies.", []string{"Playwright/Cypress", "CI/CD integration", "Performance testing"}, []string{"Flexible hours", "Gym membership", "Home office stipend"}, true},
	}

	for _, j := range jobs {
		_, err = pool.Exec(ctx, `
			INSERT INTO jobs (slug, title, location, job_type, team, salary_range, description, requirements, benefits, is_active)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
			ON CONFLICT (slug) DO NOTHING
		`, j.slug, j.title, j.location, j.jobType, j.team, j.salaryRange, j.description, j.requirements, j.benefits, j.active)
		if err != nil {
			log.Printf("Failed to seed job %s: %v", j.title, err)
		}
	}

	// Seed Services
	services := []struct {
		slug        string
		title       string
		description string
		icon        string
		features    []string
		category    string
	}{
		{"web-development", "Web Development", "Enterprise-grade web applications built with modern frameworks. We focus on scalability, performance, and SEO-friendly architectures.", "globe", []string{"React & Next.js", "Custom SaaS Platforms", "E-commerce Solutions", "API Development"}, "development"},
		{"mobile-app-development", "Mobile App Development", "Native and cross-platform mobile experiences that feel premium. We build apps that people actually use and love.", "smartphone", []string{"iOS & Android", "React Native", "Flutter", "App Store Optimization"}, "development"},
		{"ui-ux-design", "UI/UX Design", "High-end visual identities and user interfaces. We design for clarity, accessibility, and conversion.", "layout", []string{"User Research", "Bento-style Layouts", "Design Systems", "Interactive Prototypes"}, "design"},
		{"ai-automation", "AI & Automation", "Integrating LLMs and machine learning into your business workflows. We help you work smarter, not harder.", "cpu", []string{"Gemini & GPT Integration", "Custom AI Agents", "Workflow Automation", "Predictive Analytics"}, "ai"},
		{"cloud-infrastructure", "Cloud Infrastructure", "Scalable and secure cloud solutions built on AWS, GCP, or Azure tailored to your needs.", "cloud", []string{"AWS/GCP/Azure", "DevOps", "Containerization", "Serverless"}, "infrastructure"},
	}

	for i, s := range services {
		_, err = pool.Exec(ctx, `
			INSERT INTO services (slug, title, description, icon, features, category, sort_order, is_active)
			VALUES ($1, $2, $3, $4, $5, $6, $7, true)
			ON CONFLICT (slug) DO NOTHING
		`, s.slug, s.title, s.description, s.icon, s.features, s.category, i)
		if err != nil {
			log.Printf("Failed to seed service %s: %v", s.title, err)
		}
	}

	// Seed Pricing Tiers
	pricing := []struct {
		slug         string
		title        string
		description  string
		priceDisplay string
		priceAmount  int
		features     []string
		accentColor  string
		popular      bool
	}{
		{"mvp-starter", "MVP Starter", "Optimized for core business validation", "1,50,000", 150000, []string{"5 Custom Developed Pages", "Essential UI Micro-interactions", "Lead Generation Hooks", "Standard Performance Audit", "2-Week Rapid Delivery"}, "text-emerald-500", false},
		{"pro-business", "Pro Business", "Scale with custom application logic", "5,50,000", 550000, []string{"15 Dynamic Pages & CMS", "3 API Integrations (Auth/CRM)", "High-Conversion UI Kit", "Strategic Solution Blueprint", "5-Week Delivery Milestone"}, "text-[#0052ff]", true},
		{"enterprise", "Enterprise", "Architecture for global distribution", "15,00,000+", 1500000, []string{"Distributed Cloud Architecture", "Real-time Data Sync (WebSocket)", "Native AI & Gemini Integration", "Advanced Security Audits", "Primary Engineering Slot"}, "text-purple-500", false},
	}

	for i, p := range pricing {
		_, err = pool.Exec(ctx, `
			INSERT INTO pricing_tiers (slug, title, description, price_display, price_amount, features, accent_color, is_popular, sort_order, is_active)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
			ON CONFLICT (slug) DO NOTHING
		`, p.slug, p.title, p.description, p.priceDisplay, p.priceAmount, p.features, p.accentColor, p.popular, i)
		if err != nil {
			log.Printf("Failed to seed pricing tier %s: %v", p.title, err)
		}
	}

	// Seed FAQ categories
	faqCategories := []struct {
		question string
		answer   string
		category string
	}{
		{"How do you calculate project costs?", "Our pricing is entirely project-based. We look at the complexity (number of pages/sections), technical requirements (real-time features, API integrations), and the amount of custom media required.", "pricing"},
		{"Do you have a minimum project size?", "We typically work on projects starting at ₹1,50,000 to ensure we can deliver the high level of quality and attention our clients expect.", "pricing"},
		{"How long does a typical project take?", "A standard 5-10 page website usually takes 3-5 weeks. More complex applications with real-time features or heavy integrations can take 8-12 weeks.", "pricing"},
		{"What happens if I want to add pages later?", "No problem at all. We build in a scalable way, and adding new sections or features post-launch is common. We'll simply provide a quote for the additional scope.", "pricing"},
		{"Do you provide post-launch support?", "Yes! We offer 30 days of free support after launch, and ongoing maintenance plans are available.", "support"},
		{"What technologies do you use?", "We specialize in React, Next.js, Node.js, Python, Go, PostgreSQL, MongoDB, AWS, and more. We choose the best tech stack based on your project requirements.", "general"},
		{"How do you handle project communication?", "We provide dedicated Slack channels, regular video standups, and detailed progress reports. You'll have a dedicated project manager as your single point of contact.", "process"},
	}

	for i, faq := range faqCategories {
		_, err = pool.Exec(ctx, `
			INSERT INTO faqs (question, answer, category, sort_order, is_active)
			VALUES ($1, $2, $3, $4, true)
			ON CONFLICT DO NOTHING
		`, faq.question, faq.answer, faq.category, i)
		if err != nil {
			log.Printf("Failed to seed FAQ: %v", err)
		}
	}

	// Create admin user (password: changeme123)
	adminPasswordHash, _ := auth.HashPassword("changeme123")
	_, err = pool.Exec(ctx, `
		INSERT INTO users (email, password_hash, name, role)
		VALUES ('admin@appnity.io', $1, 'Admin', 'admin')
		ON CONFLICT (email) DO NOTHING
	`, adminPasswordHash)
	if err != nil {
		log.Printf("Failed to seed admin user: %v", err)
	}

	log.Println("Default data seeded successfully")
}
