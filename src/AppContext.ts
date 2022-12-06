import { createContext, Dispatch, SetStateAction } from 'react';
import { DrawMode } from './hooks/useDrawMode';
import { Filter, FilterType } from './hooks/useFilter';
interface AppContext {
  image: ImageData | null;
  readImageFile: (file: Blob) => void;
  drawMode: DrawMode;
  setDrawMode: Dispatch<SetStateAction<DrawMode>>;
  filter: Filter;
  setFilter: (type: FilterType, fn: (value: number) => number) => void;
  currentBezier: number[];
  setCurrentBezier: Dispatch<SetStateAction<number[]>>;
  histogramEffectTrigger: boolean;
  refreshHistogram: () => void;
  imageEffectTrigger: boolean;
  refreshImage: () => void;
  generateImage: (v: number) => void;
}

const appContextDefaultValue: AppContext = {
  image: null,
  readImageFile: () => {},
  drawMode: DrawMode.Brush,
  setDrawMode: () => {},
  filter: { type: FilterType.None, fn: (value) => value },
  setFilter: () => {},
  currentBezier: [],
  setCurrentBezier: () => {},
  histogramEffectTrigger: false,
  refreshHistogram: () => {},
  imageEffectTrigger: false,
  refreshImage: () => {},
  generateImage: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
