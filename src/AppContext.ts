import { createContext, Dispatch, SetStateAction } from 'react';
import { DrawMode } from './hooks/useDrawMode';
import { Filter, FilterType } from './hooks/useFilter';
interface AppContext {
  setErrorText: (text: string, timeout?: number) => void;
  forceRerender: () => void;
  image: ImageData | null;
  readImageFile: (file: Blob) => void;
  drawMode: DrawMode;
  setDrawMode: Dispatch<SetStateAction<DrawMode>>;
  filter: Filter | null;
  setFilter: (type: FilterType, fn: (value: number) => number) => void;
}

const appContextDefaultValue: AppContext = {
  setErrorText: () => {},
  forceRerender: () => {},
  image: null,
  readImageFile: () => {},
  drawMode: DrawMode.Brush,
  setDrawMode: () => {},
  filter: null,
  setFilter: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
