// app/about/page.js
import TemperatureHumidityGraphs from '../component/TemperatureHumidityGraphs'; // ตรวจสอบเส้นทางนำเข้า
import 'bootstrap/dist/css/bootstrap.min.css';

export default function About() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>About Page</h1>
      <TemperatureHumidityGraphs />
    </div>
  );
}
