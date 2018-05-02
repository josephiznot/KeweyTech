-- SELECT *
-- FROM out_of_bounds
-- JOIN geofences ON out_of_bounds.fence_id = geofences.fence_id;
SELECT *
FROM out_of_bounds
JOIN geofences ON out_of_bounds.fence_id = geofences.fence_id
JOIN users ON users.user_id = out_of_bounds.user_id