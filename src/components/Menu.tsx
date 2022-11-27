import { useContext } from 'react';
import { AppContext } from '../AppContext';
import './Menu.css';

function Menu() {
  const {} = useContext(AppContext);

  return (
    <div className='menu'>
      <header>
        <h1>Title</h1>
        <div className='name'>Norbert Niziołek</div>
        <a href='https://github.com/nizioleque/gk-lab-3' target='_blank'>
          Kod źródłowy i dokumentacja
        </a>
      </header>
      <div className='menu-section center'></div>
    </div>
  );
}

export default Menu;
