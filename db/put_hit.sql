UPDATE out_of_bounds
SET latitude = $1, longitude = $2
WHERE o_b_id = $3;