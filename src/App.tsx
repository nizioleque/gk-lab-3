import Canvas from './components/Canvas';
import './App.css';
import Menu from './components/Menu';
import { AppContext } from './AppContext';
import useRefreshHistogram from './hooks/useRefreshHistogram';
import useImage from './hooks/useImage';
import Histogram from './components/Histogram';
import useDrawMode from './hooks/useDrawMode';
import useFilter from './hooks/useFilter';
import { useState } from 'react';
import useRefreshImage from './hooks/useRefreshImage';

function App() {
  const { histogramEffectTrigger, refreshHistogram } = useRefreshHistogram();
  const { imageEffectTrigger, refreshImage } = useRefreshImage();
  const { image, readImageFile } = useImage();
  const { drawMode, setDrawMode } = useDrawMode();
  const { filter, setFilter } = useFilter();
  const [currentBezier, setCurrentBezier] = useState<number[]>([]);

  return (
    <AppContext.Provider
      value={{
        image,
        readImageFile,
        drawMode,
        setDrawMode,
        filter,
        setFilter,
        currentBezier,
        setCurrentBezier,
        histogramEffectTrigger,
        refreshHistogram,
        imageEffectTrigger,
        refreshImage,
      }}
    >
      <div className='App'>
        <Menu />
        <div className='canvas-container'>
          <Canvas />
        </div>
        <Histogram />
      </div>
    </AppContext.Provider>
  );
}

export default App;
