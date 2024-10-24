const { Pool } = require('pg'); // PostgreSQL client
const pool = new Pool({
  user: 'your-username',
  host: 'your-aws-endpoint',
  database: 'your-database-name',
  password: 'your-password',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
