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
                } else {
                    console.error('Error fetching LED status:', data.error);
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
            const response = await fetch('/api/LEDstatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action }),
            });

            const data = await response.json();
            if (data.success) {
                setLedStatus(!ledStatus);
            } else {
                console.error('Error updating LED status:', data.error);
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

