import { createContext, Dispatch, SetStateAction } from 'react';
import { DrawMode } from './hooks/useDrawMode';
import { Filter, FilterType } from './hooks/useFilter';
interface AppContext {
  setErrorText: (text: string, timeout?: number) => void;
  image: ImageData | null;
  readImageFile: (file: Blob) => void;
  drawMode: DrawMode;
  setDrawMode: Dispatch<SetStateAction<DrawMode>>;
  filter: Filter;
  setFilter: (type: FilterType, fn: (value: number) => number) => void;
  currentBezier: number[];
  setCurrentBezier: Dispatch<SetStateAction<number[]>>;
  effectTrigger: boolean;
  refreshHistogram: () => void;
}

const appContextDefaultValue: AppContext = {
  setErrorText: () => {},
  image: null,
  readImageFile: () => {},
  drawMode: DrawMode.Brush,
  setDrawMode: () => {},
  filter: { type: FilterType.None, fn: (value) => value },
  setFilter: () => {},
  currentBezier: [],
  setCurrentBezier: () => {},
  effectTrigger: false,
  refreshHistogram: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
