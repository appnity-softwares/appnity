package middleware

import (
	"appnity-backend/pkg/auth"
	"github.com/gofiber/fiber/v2"
	"strings"
)

type AdminAuth struct {
	jwtManager *auth.JWTManager
}

func NewAdminAuth(jwtManager *auth.JWTManager) *AdminAuth {
	return &AdminAuth{jwtManager: jwtManager}
}

func (m *AdminAuth) RequireAuth() fiber.Handler {
	return func(c *fiber.Ctx) error {
		wantsHTML := strings.Contains(c.Get("Accept"), "text/html")

		authHeader := c.Get("Authorization")
		cookieToken := c.Cookies("token")

		if authHeader == "" && cookieToken == "" {
			if wantsHTML {
				return c.Redirect("/admin/login")
			}
			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
		}

		tokenString := ""
		if authHeader != "" {
			tokenString = strings.TrimPrefix(authHeader, "Bearer ")
		} else {
			tokenString = cookieToken
		}
		if tokenString == authHeader {
			if wantsHTML {
				c.ClearCookie("token")
				return c.Redirect("/admin/login")
			}
			return c.Status(401).JSON(fiber.Map{"error": "Invalid token format"})
		}

		claims, err := m.jwtManager.ValidateToken(tokenString)
		if err != nil {
			if wantsHTML {
				c.ClearCookie("token")
				return c.Redirect("/admin/login")
			}
			return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired token"})
		}

		c.Locals("user", claims)
		return c.Next()
	}
}

func AdminOnly() fiber.Handler {
	return func(c *fiber.Ctx) error {
		user := c.Locals("user")
		if user == nil {
			return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
		}

		claims, ok := user.(*auth.Claims)
		if !ok || claims.Role != "admin" {
			return c.Status(403).JSON(fiber.Map{"error": "Forbidden - Admin access required"})
		}

		return c.Next()
	}
}
