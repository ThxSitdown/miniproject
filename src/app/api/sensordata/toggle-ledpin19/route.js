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

    // อัพเดทสถานะ LED pin19 ในฐานข้อมูลถ้าต้องการ
    await pool.query(
      'UPDATE led_status SET status = $1 WHERE id = 1', // ใช้การอัพเดทให้ตรงกับฐานข้อมูลของคุณ
      [ledpin19_status]
    );

    return new Response(JSON.stringify({ ledpin19_status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return handleError(error);
  }
}

