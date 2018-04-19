UPDATE geofences
SET is_active = $1,
WHERE fence_id = $2;