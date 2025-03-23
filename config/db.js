const { Pool } = require("pg");
const dotenv = require("dotenv");
const { database } = require("pg/lib/defaults");

dotenv.config();


const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase Postgres SSL
  },
  family: 4 
});

// pool.on("connect", () => {
//   console.log("DB Connected");
// });

// pool.on("error",(err)=>{
//     console.error("Error occured" + err);
// })
(async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Connected! Server time:', res.rows[0]);
    client.release();
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    pool.end();
  }
})();

module.exports = pool; 