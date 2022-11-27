import { useState } from 'react';

export default function useError(): {
  showError: boolean;
  errorText: string | undefined;
  setErrorText: (text: string, timeout?: number) => void;
} {
  const [errorText, _setErrorText] = useState<string | undefined>(undefined);
  const [showError, setShowError] = useState<boolean>(false);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);
  const setErrorText = (text: string, timeout: number = 3000) => {
    timeouts.forEach(clearTimeout);
    setTimeouts([]);
    _setErrorText(text);
    setShowError(true);
    const timeout1 = setTimeout(() => {
      setShowError(false);
      const timeout2 = setTimeout(() => _setErrorText(undefined), 200);
      timeouts.push(timeout2);
      setTimeouts([...timeouts, timeout2]);
    }, timeout);
    setTimeouts([...timeouts, timeout1]);
  };

  return { showError, errorText, setErrorText };
}
