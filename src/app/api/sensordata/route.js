import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export async function POST(request) {
  try {
    const { temperature, humidity } = await request.json();
    console.log('Received data:', { temperature, humidity });

    const res = await client.query(
      'INSERT INTO sensor_data (temperature, humidity) VALUES ($1, $2) RETURNING *',
      [temperature, humidity]
    );
    console.log('Database response:', res.rows[0]);

    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error details:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
