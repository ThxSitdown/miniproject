import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const handleError = (error) => {
  console.error('Database error:', error);
  return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
};

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM sensor_data ORDER BY id DESC LIMIT 1');
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    const { sensor_id, temperature, humidity, motor_status, heater_status, led_status, led_timer_start, led_timer_end } = await request.json();

    if (!sensor_id || temperature == null || humidity == null) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await pool.query(
      'INSERT INTO sensor_data (sensor_id, temperature, humidity, motor_status, heater_status, led_status, led_timer_start, led_timer_end) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [sensor_id, temperature, humidity, motor_status, heater_status, led_status, led_timer_start, led_timer_end]
    );
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
}
