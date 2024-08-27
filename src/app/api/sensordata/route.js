// app/api/sensordata/route.js

import { Pool } from 'pg'; // ใช้ Pool แทน Client
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ฟังก์ชันจัดการข้อผิดพลาด
const handleError = (error) => {
  console.error('Database error:', error);
  return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
};

// ฟังก์ชันสำหรับ HTTP methods ต่าง ๆ
export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM sensor_data');
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    const { sensor_id, temperature, humidity, motor_status, heater_status } = await request.json();
    console.log("Received motor_status:", motor_status);  // พิมพ์ค่าที่ได้รับ
    console.log("Received heater_status:", heater_status);  // พิมพ์ค่าที่ได้รับ
    
    if (!sensor_id || temperature == null || humidity == null) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await pool.query(
      'INSERT INTO sensor_data (sensor_id, temperature, humidity, motor_status, heater_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [sensor_id, temperature, humidity, motor_status, heater_status]
    );
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request) {
  try {
    const { id, sensor_id, temperature, humidity, motor_status, heater_status } = await request.json();

    if (!id || !sensor_id || temperature == null || humidity == null) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await pool.query(
      'UPDATE sensor_data SET sensor_id = $1, temperature = $2, humidity = $3, motor_status = $4, heater_status = $5 WHERE id = $6 RETURNING *',
      [sensor_id, temperature, humidity, motor_status, heater_status, id]
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
    return handleError(error);
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Invalid input data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await pool.query('DELETE FROM sensor_data WHERE id = $1 RETURNING *', [id]);

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
    return handleError(error);
  }
}
