UPDATE users
SET contact_email = $1, is_admin = false, tracker = $2, admin_password = $4
where user_id = $3