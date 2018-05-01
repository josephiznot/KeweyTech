SELECT profile_pic
FROM users
WHERE user_id IN (SELECT user_id
                  FROM out_of_bounds
                  WHERE o_b_id = $1)