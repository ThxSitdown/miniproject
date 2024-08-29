// src/app/component/LEDControl.js
import { useState } from 'react';

const LEDControlButton = () => {
    const [ledStatus, setLedStatus] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleLed = async () => {
        setLoading(true);
        const action = ledStatus ? 'off' : 'on';

        try {
            const response = await fetch('/api/LEDcontrol', {
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

