UPDATE users
SET contact_email = $1, is_admin = false, tracker = $2
where user_id = $3

--DEPRACATED THE ADMIN PASSWORD BECAUSE IT WOULD NOT UPDATE WITH THE SETTINGS.
-- UPDATE users
-- SET contact_email = $1, is_admin = false, tracker = $2, admin_password = $4
-- where user_id = $3