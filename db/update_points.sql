UPDATE geofences
SET fence_center = $1, fence_points = $2
WHERE fence_key = $3;