UPDATE geofences
SET center_lat = $1,
    center_lng = $2,
WHERE fence_id = $3;