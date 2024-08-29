import { Client } from 'pg';
import { Gpio } from 'onoff';  // ใช้ไลบรารีสำหรับควบคุม GPIO

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const ledPin = new Gpio(19, 'out');  // กำหนด pin19 เป็น output

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { action } = req.body;

        try {
            await client.connect();

            let status;
            if (action === 'on') {
                ledPin.writeSync(1);  // เปิด LED
                status = true;
            } else if (action === 'off') {
                ledPin.writeSync(0);  // ปิด LED
                status = false;
            }

            // บันทึกสถานะ LED ลงในฐานข้อมูล
            const queryText = 'UPDATE led_status SET status = $1 WHERE pin = $2 RETURNING *';
            const result = await client.query(queryText, [status, 19]);

            res.status(200).json({ success: true, status: result.rows[0] });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        } finally {
            await client.end();
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
