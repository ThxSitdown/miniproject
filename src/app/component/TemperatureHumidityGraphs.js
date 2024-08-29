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

const TemperatureHumidityGraphs = () => {
  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
        pointBorderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
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
        borderWidth: 2,
        pointRadius: 3,
        pointBorderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/sensordata');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched Data:', data);

        if (!Array.isArray(data) || data.length === 0) {
          console.error('Data is not an array or is empty');
          return;
        }

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

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: '10px' }}>Temperature Graph</h2>
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
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Temperature (°C)',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 5,
                  },
                },
              },
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: '10px' }}>Humidity Graph</h2>
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
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Humidity (%)',
                    font: {
                      size: 14,
                      weight: 'bold',
                    },
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 10,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TemperatureHumidityGraphs;
