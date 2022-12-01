import { createContext } from 'react';
interface AppContext {
  setErrorText: (text: string, timeout?: number) => void;
  forceRerender: () => void;
  image: ImageData | null;
  readImageFile: (file: Blob) => void;
}

const appContextDefaultValue: AppContext = {
  setErrorText: () => {},
  forceRerender: () => {},
  image: null,
  readImageFile: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
