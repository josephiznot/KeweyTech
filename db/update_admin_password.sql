UPDATE users
SET admin_password = $1
WHERE user_id = $2