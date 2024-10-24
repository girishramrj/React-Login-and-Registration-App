const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');  // Secure password hashing
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Ensure `users` table exists on startup
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
  );
`, (err, res) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Users table ready or already exists');
  }
});

// Registration route to create a new user
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {  // Unique violation error
      res.status(200).json({ message: 'User already exists', username });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Compare the hashed password with the provided one
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server and bind it to 0.0.0.0
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://<your-ec2-public-ip>:${PORT}`);
});
