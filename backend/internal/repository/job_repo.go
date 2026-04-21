package repository

import (
	"appnity-backend/internal/models"
	"context"
	"encoding/json"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type JobRepository struct {
	db *pgxpool.Pool
}

func NewJobRepository(db *pgxpool.Pool) *JobRepository {
	return &JobRepository{db: db}
}

func (r *JobRepository) GetAll(ctx context.Context) ([]models.Job, error) {
	rows, err := r.db.Query(ctx, `
		SELECT id, slug, title, location, job_type, team, salary_range, description, 
		       requirements, responsibilities, benefits, is_active, created_at, updated_at
		FROM jobs WHERE is_active = true ORDER BY created_at DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var jobs []models.Job
	for rows.Next() {
		var j models.Job
		var requirements, responsibilities, benefits []byte
		err := rows.Scan(&j.ID, &j.Slug, &j.Title, &j.Location, &j.JobType, &j.Team,
			&j.SalaryRange, &j.Description, &requirements, &responsibilities, &benefits,
			&j.IsActive, &j.CreatedAt, &j.UpdatedAt)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(requirements, &j.Requirements)
		json.Unmarshal(responsibilities, &j.Responsibilities)
		json.Unmarshal(benefits, &j.Benefits)
		jobs = append(jobs, j)
	}
	return jobs, nil
}

func (r *JobRepository) ListAll(ctx context.Context) ([]models.Job, error) {
	rows, err := r.db.Query(ctx, `
		SELECT id, slug, title, location, job_type, team, salary_range, description,
		       requirements, responsibilities, benefits, is_active, created_at, updated_at
		FROM jobs ORDER BY created_at DESC
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var jobs []models.Job
	for rows.Next() {
		var j models.Job
		var requirements, responsibilities, benefits []byte
		err := rows.Scan(&j.ID, &j.Slug, &j.Title, &j.Location, &j.JobType, &j.Team,
			&j.SalaryRange, &j.Description, &requirements, &responsibilities, &benefits,
			&j.IsActive, &j.CreatedAt, &j.UpdatedAt)
		if err != nil {
			return nil, err
		}
		json.Unmarshal(requirements, &j.Requirements)
		json.Unmarshal(responsibilities, &j.Responsibilities)
		json.Unmarshal(benefits, &j.Benefits)
		jobs = append(jobs, j)
	}
	return jobs, nil
}

func (r *JobRepository) GetBySlug(ctx context.Context, slug string) (*models.Job, error) {
	var j models.Job
	var requirements, responsibilities, benefits []byte

	query := `SELECT id, slug, title, location, job_type, team, salary_range, description, 
	          requirements, responsibilities, benefits, is_active, created_at, updated_at
	          FROM jobs WHERE slug = $1`
	err := r.db.QueryRow(ctx, query, slug).Scan(
		&j.ID, &j.Slug, &j.Title, &j.Location, &j.JobType, &j.Team,
		&j.SalaryRange, &j.Description, &requirements, &responsibilities, &benefits,
		&j.IsActive, &j.CreatedAt, &j.UpdatedAt,
	)
	if err == pgx.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	json.Unmarshal(requirements, &j.Requirements)
	json.Unmarshal(responsibilities, &j.Responsibilities)
	json.Unmarshal(benefits, &j.Benefits)
	return &j, nil
}

func (r *JobRepository) Create(ctx context.Context, job *models.Job) error {
	requirements, _ := json.Marshal(job.Requirements)
	responsibilities, _ := json.Marshal(job.Responsibilities)
	benefits, _ := json.Marshal(job.Benefits)

	query := `INSERT INTO jobs (slug, title, location, job_type, team, salary_range, description, requirements, responsibilities, benefits)
	          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id, created_at, updated_at`
	return r.db.QueryRow(ctx, query, job.Slug, job.Title, job.Location, job.JobType, job.Team,
		job.SalaryRange, job.Description, requirements, responsibilities, benefits,
	).Scan(&job.ID, &job.CreatedAt, &job.UpdatedAt)
}

func (r *JobRepository) Update(ctx context.Context, job *models.Job) error {
	requirements, _ := json.Marshal(job.Requirements)
	responsibilities, _ := json.Marshal(job.Responsibilities)
	benefits, _ := json.Marshal(job.Benefits)

	query := `UPDATE jobs SET title = $2, location = $3, job_type = $4, team = $5, salary_range = $6,
	          description = $7, requirements = $8, responsibilities = $9, benefits = $10, is_active = $11, updated_at = NOW()
	          WHERE id = $1`
	_, err := r.db.Exec(ctx, query, job.ID, job.Title, job.Location, job.JobType, job.Team,
		job.SalaryRange, job.Description, requirements, responsibilities, benefits, job.IsActive)
	return err
}

func (r *JobRepository) Delete(ctx context.Context, id uuid.UUID) error {
	_, err := r.db.Exec(ctx, "DELETE FROM jobs WHERE id = $1", id)
	return err
}
