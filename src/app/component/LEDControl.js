// src/app/component/LEDControl.js
'use client';
import { useState, useEffect } from 'react';

const LEDControlButton = () => {
    const [ledStatus, setLedStatus] = useState(false);
    const [loading, setLoading] = useState(false);

    // ฟังก์ชันเพื่ออัปเดตสถานะเริ่มต้นจาก API
    useEffect(() => {
        const fetchLedStatus = async () => {
            try {
                const response = await fetch('/api/LEDstatus');
                const data = await response.json();
                if (data.success) {
                    setLedStatus(data.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLedStatus();
    }, []);

    const toggleLed = async () => {
        setLoading(true);
        const action = ledStatus ? 'off' : 'on';

        try {
            const response = await fetch('/api/LEDstatus', {  // ตรวจสอบว่าเส้นทางตรงกันกับ API route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action }),
            });

            const data = await response.json();
            if (data.success) {
                setLedStatus(!ledStatus);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={toggleLed} disabled={loading}>
            {loading ? 'Processing...' : ledStatus ? 'Turn LED Off' : 'Turn LED On'}
        </button>
    );
};

export default LEDControlButton;
