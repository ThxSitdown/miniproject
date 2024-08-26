import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

export async function POST(request) {
  try {
    // ดึงค่า sensor_id, temperature, และ humidity จาก request JSON
    const { sensor_id, temperature, humidity } = await request.json();
    console.log('Received data:', { sensor_id, temperature, humidity });

    // ตรวจสอบว่าค่า sensor_id ถูกส่งมาหรือไม่
    if (!sensor_id) {
      throw new Error('sensor_id is required');
    }

    // แทรกข้อมูลลงในฐานข้อมูลพร้อมกับ sensor_id
    const res = await client.query(
      'INSERT INTO sensor_data (sensor_id, temperature, humidity) VALUES ($1, $2, $3) RETURNING *',
      [sensor_id, temperature, humidity]
    );
    console.log('Database response:', res.rows[0]);

    // ส่งข้อมูลที่ถูกแทรกกลับไปเป็น JSON
    return new Response(JSON.stringify(res.rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error details:', error);

    // ส่ง error response กลับไปในกรณีที่เกิดข้อผิดพลาด
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
