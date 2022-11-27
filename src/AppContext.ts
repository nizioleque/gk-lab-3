import { createContext } from 'react';
interface AppContext {
  setErrorText: (text: string, timeout?: number) => void;
  forceRerender: () => void;
}

const appContextDefaultValue: AppContext = {
  setErrorText: () => {},
  forceRerender: () => {},
};

export const AppContext = createContext<AppContext>(appContextDefaultValue);
