// app/api/sensordata/route.js
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

const handleError = (error) => {
  console.error('Database error:', error);
  return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
};

export async function GET() {
  try {
    const result = await client.query('SELECT * FROM sensor_data');
    if (result.rowCount === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    const { sensor_id, temperature, humidity, motor_status, heater_status, ledpin19_status } = await request.json();

    if (!sensor_id || temperature == null || humidity == null) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await client.query(
      'INSERT INTO sensor_data (sensor_id, temperature, humidity, motor_status, heater_status, ledpin19_status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [sensor_id, temperature, humidity, motor_status, heater_status, ledpin19_status]
    );
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
}

