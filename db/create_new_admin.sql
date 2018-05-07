UPDATE users
SET is_admin=$1, admin_password= $2, tracker = $3
WHERE user_id = $3;