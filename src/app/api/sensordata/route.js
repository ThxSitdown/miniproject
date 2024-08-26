import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export async function GET() {
  try {
    const result = await client.query('SELECT * FROM sensor_data');
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const { sensor_id, temperature, humidity } = await request.json();
    const res = await client.query(
      'INSERT INTO sensor_data (sensor_id, temperature, humidity) VALUES ($1, $2, $3) RETURNING *',
      [sensor_id, temperature, humidity]
    );
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request) {
  try {
    const { id, sensor_id, temperature, humidity } = await request.json();
    const res = await client.query(
      'UPDATE sensor_data SET sensor_id = $1, temperature = $2, humidity = $3 WHERE id = $4 RETURNING *',
      [sensor_id, temperature, humidity, id]
    );
    if (res.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Data not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(res.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const res = await client.query('DELETE FROM sensor_data WHERE id = $1 RETURNING *', [id]);
    if (res.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Data not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(res.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
