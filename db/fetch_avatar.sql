SELECT DISTINCT users.profile_pic
FROM users
JOIN out_of_bounds ON out_of_bounds.user_id = users.user_id
WHERE out_of_bounds.user_id = users.user_id