import { useState } from 'react';

export default function useRefreshHistogram() {
  const [state, setState] = useState<boolean>(false);
  const refreshImage = () => setState((oldValue) => !oldValue);

  return { imageEffectTrigger: state, refreshImage };
}
