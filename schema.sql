CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    auth_id VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    g_email VARCHAR(300),
    phone_number VARCHAR(10),
    profile_pic VARCHAR(200),
    is_admin VARCHAR(1),
    display_name VARCHAR(100)
)
CREATE TABLE geolocations(
    latitude VARCHAR(300),
    longitude VARCHAR(300),
    accuracy INTEGER,
    time_stamp
    user_id INTEGER
)

CREATE TABLE geofences(
    fence_id SERIAL PRIMARY KEY,
    access_key VARCHAR(100),
    fence_name VARCHAR(100),
    is_active VARCHAR(1)
    )

-- IF TIME PERSISTS--
-- CREATE TABLE points(
--     latitude VARCHAR(100),
--     longitude VARCHAR(100),
--     fence_id JOIN WITH geofences fence_id
-- )