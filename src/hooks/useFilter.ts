import { useState } from 'react';

export enum FilterType {
  None,
  Negation,
  Brightness,
  Gamma,
  Contrast,
  Custom,
}

export interface Filter {
  type: FilterType;
  fn: (value: number) => number;
}

export default function useFilter() {
  const [filter, _setFilter] = useState<Filter>({
    type: FilterType.None,
    fn: (value) => value,
  });

  const setFilter = (type: FilterType, fn: (value: number) => number) => {
    _setFilter({ type, fn });
  };

  return { filter, setFilter };
}
