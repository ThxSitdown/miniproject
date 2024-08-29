// app/api/LEDcontrol/route.js
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// ตั้งค่าการเชื่อมต่อกับ PostgreSQL
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

const handleError = (error) => {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
};

export async function GET() {
    try {
        const result = await client.query('SELECT status FROM led_status WHERE pin = $1', [19]);
        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ success: false, error: 'No data found for the specified pin' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const status = result.rows[0]?.status ?? false;
        return new Response(JSON.stringify({ success: true, status }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return handleError(error);
    }
}

export async function POST(request) {
    try {
        const { action } = await request.json();
        if (typeof action !== 'string') {
            return new Response(JSON.stringify({ success: false, error: 'Invalid request payload' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const status = action === 'on';

        const result = await client.query('UPDATE led_status SET status = $1 WHERE pin = $2 RETURNING *', [status, 19]);

        if (result.rowCount === 0) {
            return new Response(JSON.stringify({ success: false, error: 'Failed to update LED status' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return handleError(error);
    }
}
