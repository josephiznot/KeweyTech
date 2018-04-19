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
CREATE TABLE out_of_bounds(
    o_b_id SERIAL PRIMARY KEY,
    latitude VARCHAR(300),
    longitude VARCHAR(300),
    accuracy INTEGER,
    user_id INTEGER REFERENCES users (user_id),
    fence_id INTEGER REFERENCES geofences (fence_id),
    resolution VARCHAR(100)
)

CREATE TABLE geofences(
    fence_id SERIAL PRIMARY KEY,
    center_lat VARCHAR(100),
    center_lng VARCHAR(100),
    fence_key VARCHAR(100),
    fence_alias VARCHAR(100),
    is_active VARCHAR(1)
    )

