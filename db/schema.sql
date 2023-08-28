DROP TABLE IF EXISTS todos;
CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY autoincrement, name TEXT, completed BOOLEAN DEFAULT 0);
INSERT INTO todos (id, name) VALUES (1, 'Learn Gatsby'), (2, 'Learn GraphQL');
