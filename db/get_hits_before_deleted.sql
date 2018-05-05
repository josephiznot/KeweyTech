-- SELECT *
-- FROM out_of_bounds
-- WHERE fence_id 
-- IN(
-- SELECT DISTINCT out_of_bounds.fence_id
-- FROM out_of_bounds
-- JOIN geofences ON geofences.fence_id = out_of_bounds.fence_id
-- WHERE geofences.fence_key = $1)
SELECT geofences.fence_alias, users.display_name, out_of_bounds.hit_date
FROM out_of_bounds
JOIN users ON users.user_id = out_of_bounds.user_id
JOIN geofences ON geofences.fence_id = out_of_bounds.fence_id
WHERE out_of_bounds.fence_id 
IN(
SELECT DISTINCT out_of_bounds.fence_id
FROM out_of_bounds
JOIN geofences ON geofences.fence_id = out_of_bounds.fence_id
WHERE geofences.fence_key = $1);