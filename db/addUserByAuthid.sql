INSERT INTO users (auth_id, first_name, last_name, profile_pic, g_email, display_name) 
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;