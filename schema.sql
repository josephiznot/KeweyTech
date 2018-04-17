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
