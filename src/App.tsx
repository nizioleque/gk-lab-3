import Canvas from './components/Canvas';
import './App.css';
import Menu from './components/Menu';
import { AppContext } from './AppContext';
import useRefreshHistogram from './hooks/useForceRerender';
import useError from './hooks/useError';
import useImage from './hooks/useImage';
import Histogram from './components/Histogram';
import useDrawMode from './hooks/useDrawMode';
import useFilter from './hooks/useFilter';
import { useState } from 'react';

function App() {
  const { effectTrigger, refreshHistogram } = useRefreshHistogram();
  const { showError, errorText, setErrorText } = useError();

  const { image, readImageFile } = useImage();
  const { drawMode, setDrawMode } = useDrawMode();
  const { filter, setFilter } = useFilter();
  const [currentBezier, setCurrentBezier] = useState<number[]>([]);

  return (
    <AppContext.Provider
      value={{
        setErrorText,
        image,
        readImageFile,
        drawMode,
        setDrawMode,
        filter,
        setFilter,
        currentBezier,
        setCurrentBezier,
        effectTrigger,
        refreshHistogram,
      }}
    >
      <div className='App'>
        <Menu />
        <div className='canvas-container'>
          <Canvas />
        </div>
        <Histogram />
      </div>
      <div className={`alert ${showError ? 'show' : ''}`}>
        <div className='alert-icon'>⚠️</div>
        <div>{errorText}</div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
