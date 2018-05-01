UPDATE out_of_bounds
SET latitude = $1, longitude = $2, hit_date = $4
WHERE o_b_id = $3;