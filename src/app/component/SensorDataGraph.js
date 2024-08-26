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

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SensorDataGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/sensordata');
      const data = await response.json();

      const timestamps = data.map(item => item.timestamp);
      const temperatures = data.map(item => item.temperature);
      const humidities = data.map(item => item.humidity);

      setChartData({
        labels: timestamps,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Humidity (%)',
            data: humidities,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData && (
        <Line
          data={chartData}
          options={{
            scales: {
              x: { title: { display: true, text: 'Timestamp' } },
              y: { title: { display: true, text: 'Value' } },
            },
          }}
        />
      )}
    </div>
  );
};

export default SensorDataGraph;
