import { useContext } from 'react';
import AnimateHeight from 'react-animate-height';
import { AppContext } from '../AppContext';
import { DrawMode } from '../hooks/useDrawMode';
import Button from './Button';
import './Menu.css';

function Menu() {
  const { readImageFile, drawMode, setDrawMode } = useContext(AppContext);

  const readExampleImage = (path: string) => {
    fetch(path)
      .then((res) => res.blob())
      .then((blob) => {
        readImageFile(blob);
      });
  };

  return (
    <div className='menu'>
      <header>
        <h1>Filtrowanie</h1>
        <div className='name'>Norbert Niziołek</div>
        <a href='https://github.com/nizioleque/gk-lab-3' target='_blank'>
          Kod źródłowy i dokumentacja
        </a>
      </header>
      <div className='menu-section'>
        <h3>Wczytywanie obrazu</h3>
        <div className='buttons'>
          <h5>Z pliku</h5>
          <input
            type='file'
            accept='image/*'
            onChange={(event) => {
              readImageFile(event.target.files![0]);
            }}
          />
          <h5>Przykład</h5>
          <div
            className='menu-button horizontal'
            onClick={() => {
              readExampleImage('/lena.png');
            }}
          >
            <div>Lena</div>
            <button className='apply-button'>Otwórz</button>
          </div>
        </div>
      </div>
      <div className='menu-section'>
        <h3>Zaznaczanie</h3>
        <div className='buttons'>
          <Button
            text='Pędzel kołowy'
            value={DrawMode.Brush}
            currentValue={drawMode}
            setValue={setDrawMode}
          />
          <Button
            text='Wielokąt'
            value={DrawMode.Polygon}
            currentValue={drawMode}
            setValue={setDrawMode}
          />
          <AnimateHeight
            height={drawMode === DrawMode.Polygon ? 'auto' : 0}
            duration={300}
            easing='ease-in-out'
          >
            Obszar zostanie zamalowany po zamknięciu wielokąta
          </AnimateHeight>
        </div>
      </div>
    </div>
  );
}

export default Menu;
