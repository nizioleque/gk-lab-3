import { useState } from 'react';

export default function useRefreshHistogram() {
  const [state, setState] = useState<boolean>(false);
  const refreshHistogram = () => setState((oldValue) => !oldValue);

  return { histogramEffectTrigger: state, refreshHistogram };
}
