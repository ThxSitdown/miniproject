// app/component/SensorDataGraph.js

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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// SensorStatus Component
const SensorStatus = ({ motor_Status, heater_Status }) => {
  return (
    <div>
      <p>Motor: {motor_Status ? 'On' : 'Off'}</p>
      <p>Heater: {heater_Status ? 'On' : 'Off'}</p>
    </div>
  );
};


// SensorDataGraph Component
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

  const [motor_Status, setMotorStatus] = useState(false);
  const [heater_Status, setHeaterStatus] = useState(false);

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

        // Set motor and heater status
        const latestData = data[data.length - 1]; // Assuming latest data has the latest status
        setMotorStatus(latestData.motor_status);
        setHeaterStatus(latestData.heater_status);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%' }}>
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
        <div style={{ width: '48%' }}>
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
      <SensorStatus motor_Status={motor_Status} heater_Status={heater_Status} />
    </div>
  );
};

export default SensorDataGraph;

