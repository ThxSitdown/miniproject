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

const SensorStatus = ({ motor_status, heater_status, ledpin19_status }) => {
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
        Motor: <span style={{ color: motor_Status ? 'green' : 'red' }}>
          {motor_Status ? 'On' : 'Off'}
        </span>
      </p>
      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
        Heater: <span style={{ color: heater_Status ? 'orange' : 'blue' }}>
          {heater_status ? 'warm' : 'cool'}
        </span>
      </p>
      <button 
        onClick={ledpin19_status} 
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: ledpin19_status ? 'red' : 'green',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {ledpin19_Status ? 'Turn Off LED' : 'Turn On LED'}
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

  const [motor_status, setMotorStatus] = useState(false);
  const [heater_status, setHeaterStatus] = useState(false);
  const [ledpin19_status, setLedpin19Status] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensordata');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);

        const timestamps = data.map(item => item.timestamp);
        const temperatures = data.map(item => item.temperature);
        const humidities = data.map(item => item.humidity);

        setTemperatureData(prevData => ({
          labels: timestamps,
          datasets: [
            {
              ...prevData.datasets[0],
              data: temperatures,
            },
          ],
        }));

        setHumidityData(prevData => ({
          labels: timestamps,
          datasets: [
            {
              ...prevData.datasets[0],
              data: humidities,
            },
          ],
        }));

        // Set motor, heater, and LED status
        const latestData = data[data.length - 1];
        setMotorStatus(latestData.motor_status);
        setHeaterStatus(latestData.heater_status);
        setLedpin19Status(latestData.ledpin19_status);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLedpin19Toggle = async () => {
    try {
      const newStatus = !ledpin19_Status;
      const response = await fetch('/api/sensordata/toggle-ledpin19', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ledpin19_status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setLedpin19Status(result.ledpin19_status);
    } catch (error) {
      console.error('Error toggling LED:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <div style={{ flex: 1, minWidth: '45%' }}>
          <h2>Temperature Graph</h2>
          <Line
            data={temperatureData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}°C`,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Timestamp',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Temperature (°C)',
                  },
                },
              },
            }}
          />
        </div>
        <div style={{ flex: 1, minWidth: '45%' }}>
          <h2>Humidity Graph</h2>
          <Line
            data={humidityData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}%`,
                  },
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Timestamp',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Humidity (%)',
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <SensorStatus 
          motor_Status={motor_Status} 
          heater_Status={heater_Status} 
          ledpin19_Status={ledpin19_Status}
          onLedpin19Toggle={handleLedpin19Toggle} 
        />
      </div>
    </div>
  );
};

export default SensorDataGraph;
