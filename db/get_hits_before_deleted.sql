SELECT *
FROM out_of_bounds
WHERE fence_id 
IN(
SELECT DISTINCT out_of_bounds.fence_id
FROM out_of_bounds
JOIN geofences ON geofences.fence_id = out_of_bounds.fence_id
WHERE geofences.fence_key = $1)