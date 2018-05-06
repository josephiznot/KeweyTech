UPDATE users
SET is_admin=$1, admin_password= $2
WHERE user_id = $3;