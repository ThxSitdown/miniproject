// app/api/sensordata/toggle-ledpin19/route.js
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

export async function POST(request) {
  try {
    const { ledpin19_status } = await request.json();

    if (ledpin19_status == null) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // You might want to store the status or update it in your database
    // For now, just return the status received
    return new Response(JSON.stringify({ ledpin19_status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
}
