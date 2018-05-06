SELECT admin_password, user_id
FROM users
WHERE g_email = $1;