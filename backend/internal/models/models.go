package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID                uuid.UUID  `json:"id"`
	Email             string     `json:"email"`
	PasswordHash      string     `json:"-"`
	Name              string     `json:"name"`
	Role              string     `json:"role"`
	AvatarURL         *string    `json:"avatar_url,omitempty"`
	EmailVerified     bool       `json:"email_verified"`
	ResetToken        *string    `json:"-"`
	ResetTokenExpires *time.Time `json:"-"`
	CreatedAt         time.Time  `json:"created_at"`
	UpdatedAt         time.Time  `json:"updated_at"`
}

type Project struct {
	ID          uuid.UUID `json:"id"`
	Slug        string    `json:"slug"`
	Title       string    `json:"title"`
	Category    string    `json:"category"`
	Client      string    `json:"client"`
	Description string    `json:"description"`
	Duration    string    `json:"duration"`
	Year        string    `json:"year"`
	ImageURL    string    `json:"image_url"`
	Images      []string  `json:"images"`
	Tags        []string  `json:"tags"`
	AccentColor string    `json:"accent_color"`
	Challenge   string    `json:"challenge"`
	Solution    string    `json:"solution"`
	Results     []string  `json:"results"`
	Stats       []Stat    `json:"stats"`
	IsFeatured  bool      `json:"is_featured"`
	IsPublished bool      `json:"is_published"`
	SortOrder   int       `json:"sort_order"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Stat struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

type BlogPost struct {
	ID           uuid.UUID  `json:"id"`
	Slug         string     `json:"slug"`
	Title        string     `json:"title"`
	Excerpt      string     `json:"excerpt"`
	Content      string     `json:"content"`
	Category     string     `json:"category"`
	AuthorName   string     `json:"author_name"`
	AuthorAvatar string     `json:"author_avatar"`
	ImageURL     string     `json:"image_url"`
	Tags         []string   `json:"tags"`
	IsFeatured   bool       `json:"is_featured"`
	IsPublished  bool       `json:"is_published"`
	ViewCount    int        `json:"view_count"`
	PublishedAt  *time.Time `json:"published_at,omitempty"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

type Job struct {
	ID               uuid.UUID `json:"id"`
	Slug             string    `json:"slug"`
	Title            string    `json:"title"`
	Location         string    `json:"location"`
	JobType          string    `json:"job_type"`
	Team             string    `json:"team"`
	SalaryRange      string    `json:"salary_range"`
	Description      string    `json:"description"`
	Requirements     []string  `json:"requirements"`
	Responsibilities []string  `json:"responsibilities"`
	Benefits         []string  `json:"benefits"`
	IsActive         bool      `json:"is_active"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}

type ContactInquiry struct {
	ID         uuid.UUID  `json:"id"`
	FirstName  string     `json:"first_name"`
	LastName   string     `json:"last_name"`
	Email      string     `json:"email"`
	Phone      string     `json:"phone"`
	Company    string     `json:"company"`
	Message    string     `json:"message"`
	Status     string     `json:"status"`
	Priority   string     `json:"priority"`
	AssignedTo *uuid.UUID `json:"assigned_to,omitempty"`
	Notes      string     `json:"notes"`
	CreatedAt  time.Time  `json:"created_at"`
	UpdatedAt  time.Time  `json:"updated_at"`
}

type Subscriber struct {
	ID             uuid.UUID  `json:"id"`
	Email          string     `json:"email"`
	Status         string     `json:"status"`
	Source         string     `json:"source"`
	ConfirmedAt    *time.Time `json:"confirmed_at,omitempty"`
	UnsubscribedAt *time.Time `json:"unsubscribed_at,omitempty"`
	CreatedAt      time.Time  `json:"created_at"`
}

type FAQ struct {
	ID        uuid.UUID `json:"id"`
	Question  string    `json:"question"`
	Answer    string    `json:"answer"`
	Category  string    `json:"category"`
	SortOrder int       `json:"sort_order"`
	IsActive  bool      `json:"is_active"`
	CreatedAt time.Time `json:"created_at"`
}

type Service struct {
	ID          uuid.UUID `json:"id"`
	Slug        string    `json:"slug"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Icon        string    `json:"icon"`
	Features    []string  `json:"features"`
	Category    string    `json:"category"`
	SortOrder   int       `json:"sort_order"`
	IsActive    bool      `json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
}

type PricingTier struct {
	ID           uuid.UUID `json:"id"`
	Slug         string    `json:"slug"`
	Title        string    `json:"title"`
	Description  string    `json:"description"`
	PriceAmount  int       `json:"price_amount"`
	PriceDisplay string    `json:"price_display"`
	Features     []string  `json:"features"`
	AccentColor  string    `json:"accent_color"`
	BgColor      string    `json:"bg_color"`
	IsPopular    bool      `json:"is_popular"`
	SortOrder    int       `json:"sort_order"`
	IsActive     bool      `json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
}

type HelpCategory struct {
	ID          uuid.UUID `json:"id"`
	Title       string    `json:"title"`
	Icon        string    `json:"icon"`
	Description string    `json:"description"`
	SortOrder   int       `json:"sort_order"`
	CreatedAt   time.Time `json:"created_at"`
}

type HelpArticle struct {
	ID          uuid.UUID  `json:"id"`
	Slug        string     `json:"slug"`
	Title       string     `json:"title"`
	Content     string     `json:"content"`
	CategoryID  *uuid.UUID `json:"category_id,omitempty"`
	IsPublished bool       `json:"is_published"`
	ViewCount   int        `json:"view_count"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

type SiteSettings struct {
	Key       string    `json:"key"`
	Value     string    `json:"value"`
	UpdatedAt time.Time `json:"updated_at"`
}

type DashboardStats struct {
	TotalProjects    int `json:"total_projects"`
	TotalBlogPosts   int `json:"total_blog_posts"`
	TotalJobs        int `json:"total_jobs"`
	TotalSubscribers int `json:"total_subscribers"`
	NewInquiries     int `json:"new_inquiries"`
	ActiveJobs       int `json:"active_jobs"`
}

// Request/Response types
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}

type AuthResponse struct {
	Token        string `json:"token"`
	RefreshToken string `json:"refresh_token"`
	User         User   `json:"user"`
}

type ContactRequest struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Message   string `json:"message"`
}

type NewsletterRequest struct {
	Email string `json:"email"`
}

type APIResponse struct {
	Success bool        `json:"success"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}
