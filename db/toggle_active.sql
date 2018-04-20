UPDATE geofences
SET is_active_2 = $1
WHERE fence_key = $2;