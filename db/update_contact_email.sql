UPDATE users
SET contact_email = $1
WHERE user_id = $2;