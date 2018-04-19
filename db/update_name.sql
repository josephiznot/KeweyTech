UPDATE geofences
SET fence_alias = $1,
WHERE fence_id = $2;