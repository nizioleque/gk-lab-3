import { useContext, useRef } from 'react';
import { AppContext } from '../AppContext';
import { FilterType } from '../hooks/useFilter';

interface FilterButtonProps {
  text: string;
  type: FilterType;
  fnBuilder: (param: number) => (value: number) => number;
  showParam?: boolean;
}

function FilterButton({
  text,
  type,
  fnBuilder,
  showParam = false,
}: FilterButtonProps) {
  const { setFilter, filter } = useContext(AppContext);

  const paramRef = useRef<HTMLInputElement | null>(null);

  const apply = () => {
    setFilter(type, fnBuilder(parseFloat(paramRef.current?.value ?? '0')));
  };

  return (
    <button
      onClick={apply}
      className={`menu-button ${showParam ? 'horizontal' : ''} ${
        filter && filter.type === type ? 'active' : ''
      }`}
    >
      <div>{text}</div>
      {showParam && (
        <input
          ref={paramRef}
          type='number'
          defaultValue={type == FilterType.Gamma ? 2 : 50}
          onInput={apply}
        />
      )}
    </button>
  );
}

export default FilterButton;
