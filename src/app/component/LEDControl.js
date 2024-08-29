// src/app/component/LEDControl.js
'use client';

import { useState } from 'react';
import axios from 'axios';

const LEDControl = () => {
  const [ledStatus, setLedStatus] = useState(false);

  const toggleLed = async () => {
    try {
      const newStatus = !ledStatus;
      await axios.post('/api/sensordata', {
        sensor_id: 1,
        ledpin19_status: newStatus ? 1 : 0
      });
      setLedStatus(newStatus);
    } catch (error) {
      console.error('Failed to toggle LED:', error);
    }
  };

  return (
    <div>
      <button onClick={toggleLed}>
        {ledStatus ? 'Turn Off LED' : 'Turn On LED'}
      </button>
    </div>
  );
};

export default LEDControl;
