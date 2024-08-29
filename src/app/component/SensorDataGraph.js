// app/api/component/SensorDataDraph.js
"use client";
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SensorStatus = ({ motorstatus, heaterstatus, ledpin19status, onLedpin19Toggle }) => {
  return (
    <div style={{ 
      marginTop: '20px', 
      padding: '10px', 
      border: '1px solid #ddd', 
      borderRadius: '5px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
      textAlign: 'center' 
    }}>
      <h3>Sensor Status</h3>
      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
        Motor: <span style={{ color: motorstatus ? 'green' : 'red' }}>
          {motorstatus ? 'On' : 'Off'}
        </span>
      </p>
      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
        Heater: <span style={{ color: heaterstatus ? 'orange' : 'blue' }}>
          {heaterstatus ? 'warm' : 'cool'}
        </span>
      </p>
      <button 
        onClick={onLedpin19Toggle} 
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: ledpin19status ? 'red' : 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {ledpin19status ? 'Turn Off LED' : 'Turn On LED'}
      </button>
    </div>
  );
};

const SensorDataGraph = () => {
  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  });

  const [humidityData, setHumidityData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Humidity (%)',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  });

  const [motorstatus, setMotorStatus] = useState(false);
  const [heaterstatus, setHeaterStatus] = useState(false);
  const [ledpin19status, setLedpin19Status] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/sensordata');
      const data = await response.json();
      
      const updatedTemperatureData = {
        labels: data.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
        datasets: [
          {
            ...temperatureData.datasets[0],
            data: data.map(entry => entry.temperature),
          },
        ],
      };

      const updatedHumidityData = {
        labels: data.map(entry => new Date(entry.timestamp).toLocaleTimeString()),
        datasets: [
          {
            ...humidityData.datasets[0],
            data: data.map(entry => entry.humidity),
          },
        ],
      };

      setTemperatureData(updatedTemperatureData);
      setHumidityData(updatedHumidityData);
      setMotorStatus(data.length > 0 ? data[data.length - 1].motor_status : false);
      setHeaterStatus(data.length > 0 ? data[data.length - 1].heater_status : false);
      setLedpin19Status(data.length > 0 ? data[data.length - 1].ledpin19_status : false);
    };

    fetchData();
  }, []);

  const handleLedpin19Toggle = async () => {
    const newStatus = !ledpin19status;
    const response = await fetch('/api/sensordata/toggle-ledpin19', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ledpin19_status: newStatus }),
    });
  
    if (response.ok) {
      console.log('LED status toggled successfully');
      setLedpin19Status(newStatus);
    } else {
      console.error('Failed to toggle LED status');
    }
  };  

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Sensor Data Graph</h2>
      <Line data={temperatureData} />
      <Line data={humidityData} />
      <SensorStatus 
        motorstatus={motorstatus} 
        heaterstatus={heaterstatus}
        ledpin19status={ledpin19status}
        onLedpin19Toggle={handleLedpin19Toggle} 
      />
    </div>
  );
};

export default SensorDataGraph;

