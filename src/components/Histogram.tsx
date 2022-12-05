import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import HistogramChart from './HistogramChart';
import './Menu.css';

interface HistogramData {
  r: number[];
  g: number[];
  b: number[];
}

function Histogram() {
  const { image, effectTrigger } = useContext(AppContext);

  const [histogramData, setHistogramData] = useState<HistogramData | null>(
    null
  );

  const render = async () => {
    if (!image) return;
    const newHistogramData: HistogramData = { r: [], g: [], b: [] };
    const imageData = Array.from(image.data);
    let i = 0;
    for (const val of imageData) {
      switch (i) {
        case 0:
          newHistogramData.r.push(val);
          break;
        case 1:
          newHistogramData.g.push(val);
          break;
        case 2:
          newHistogramData.b.push(val);
          break;
      }
      i = (i + 1) % 4;
    }
    setHistogramData(newHistogramData);
  };

  useEffect(() => {
    render();
  }, [image, effectTrigger]);

  return (
    <div className='menu' style={{ width: 350 }}>
      <header>
        <h1>Histogram</h1>
      </header>
      {histogramData && (
        <>
          <div className='menu-section'>
            <HistogramChart data={histogramData.r} color='#ff0000' />
          </div>
          <div className='menu-section'>
            <HistogramChart data={histogramData.g} color='#00ff00' />
          </div>
          <div className='menu-section'>
            <HistogramChart data={histogramData.b} color='#0000ff' />
          </div>
        </>
      )}
    </div>
  );
}

export default Histogram;
