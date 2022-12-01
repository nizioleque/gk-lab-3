import Canvas from './components/Canvas';
import './App.css';
import Menu from './components/Menu';
import { AppContext } from './AppContext';
import useForceRerender from './hooks/useForceRerender';
import useError from './hooks/useError';
import useImage from './hooks/useImage';

function App() {
  const { forceRerender } = useForceRerender();
  const { showError, errorText, setErrorText } = useError();

  const { image, readImageFile } = useImage();

  return (
    <AppContext.Provider
      value={{
        setErrorText,
        forceRerender,
        image,
        readImageFile,
      }}
    >
      <div className='App'>
        <Menu />
        <div className='canvas-container'>
          <Canvas />
        </div>
      </div>
      <div className={`alert ${showError ? 'show' : ''}`}>
        <div className='alert-icon'>⚠️</div>
        <div>{errorText}</div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
