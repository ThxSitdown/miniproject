import SensorDataGraph from './component/SensorDataGraph';
import LEDControl from '../components/LEDControl';

export default function Home() {
  return (
    <>
      <SensorDataGraph/>
      <LEDControl />
    </>
  );
}
