// app/component/LEDtoggle.js


"use client";
import React, { useState } from 'react';

const LedControl = () => {
  const [ledStatus, setLedStatus] = useState(false);
  const [timerStart, setTimerStart] = useState('');
  const [timerEnd, setTimerEnd] = useState('');

  const toggleLed = async () => {
    try {
      const response = await fetch('/api/led', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ledStatus: !ledStatus }),
      });
      const result = await response.json();
      if (response.ok) {
        setLedStatus(result.ledStatus);
        console.log('LED status updated:', result.ledStatus);
      } else {
        console.error('Failed to toggle LED:', result.error);
      }
    } catch (error) {
      console.error('Error toggling LED:', error);
    }
  };
  

  const setTimer = async () => {
    try {
      const data = {
        led_timer_start: timerStart,
        led_timer_end: timerEnd,
      };
      const response = await fetch('/api/led/timer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();  // เพิ่มการอ่านผลลัพธ์จากการตอบกลับ
      if (!response.ok) {
        console.error('Failed to set timer:', result.error);
      } else {
        console.log('Timer set successfully:', result);
      }
    } catch (error) {
      console.error('Error setting timer:', error);
    }
  };
  

  return (
    <div>
      <button onClick={toggleLed}>
        {ledStatus ? 'Turn LED Off' : 'Turn LED On'}
      </button>
      <div>
        <label htmlFor="timer-start">Start Time:</label>
        <input
          type="datetime-local"
          id="timer-start"
          value={timerStart}
          onChange={(e) => setTimerStart(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="timer-end">End Time:</label>
        <input
          type="datetime-local"
          id="timer-end"
          value={timerEnd}
          onChange={(e) => setTimerEnd(e.target.value)}
        />
      </div>
      <button onClick={setTimer}>Set Timer</button>
    </div>
  );
};

export default LedControl;
