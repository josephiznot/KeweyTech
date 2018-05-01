UPDATE geofences
SET fence_center = $1, fence_points = $2,fence_alias = $4, is_active_2 = $5
WHERE fence_key = $3