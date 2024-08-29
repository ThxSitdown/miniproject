// src/app/api/LEDstatus/route.js

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// GET: ดึงสถานะ LED ปัจจุบัน
export async function GET() {
    try {
        const result = await pool.query('SELECT status FROM led_status WHERE pin = $1', [19]);
        const status = result.rows[0]?.status ?? false; // ใช้ ?? แทน || เพื่อให้แน่ใจว่าจะแสดง false ก็ต่อเมื่อ undefined หรือ null
        return NextResponse.json({ success: true, status });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

// POST: อัปเดตสถานะ LED
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
