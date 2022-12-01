import { useContext } from 'react';
import { AppContext } from '../AppContext';
import './Menu.css';

function Menu() {
  const { readImageFile } = useContext(AppContext);

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
    </div>
  );
}

export default Menu;
