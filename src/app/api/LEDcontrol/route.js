// src/app/api/LEDstatus/route.js

import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// โหลด environment variables
dotenv.config();

// ตั้งค่าการเชื่อมต่อกับ PostgreSQL
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

export async function GET() {
    try {
        const result = await pool.query('SELECT status FROM led_status WHERE pin = $1', [19]);
        const status = result.rows[0]?.status ?? false;
        return NextResponse.json({ success: true, status });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function POST(req) {
    try {
        const { action } = await req.json();
        const status = action === 'on';

        const result = await pool.query('UPDATE led_status SET status = $1 WHERE pin = $2 RETURNING *', [status, 19]);
        
        if (result.rowCount === 0) {
            return NextResponse.json({ success: false, error: 'Failed to update LED status' });
        }
        
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

