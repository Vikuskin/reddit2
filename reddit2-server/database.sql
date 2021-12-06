create TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(255)
);

create TABLE posts(
  id SERIAL PRIMARY KEY,
  groups VARCHAR(255),
  tags VARCHAR(255),
  content VARCHAR(255),
  mark INTEGER,
  imagesFolder VARCHAR(255),
  user_id INTEGER
);

create TABLE ratings(
  id SERIAL PRIMARY KEY,
  stars NUMERIC(5,4),
  likes SERIAL,
  post_id INTEGER,
  FOREIGN KEY (post_id) REFERENCES posts (id)
);

create TABLE imagesPost(
  id SERIAL PRIMARY KEY,
  folder VARCHAR(255),
  post_id INTEGER,
  FOREIGN KEY (post_id) REFERENCES posts (id)
);