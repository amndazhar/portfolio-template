import { useCallback, useEffect, useRef, useState } from 'react';

/** Small transient message state for <Toast />. */
export default function useToast(duration = 2600) {
  const [toast, setToast] = useState({ message: '', visible: false });
  const timer = useRef(null);

  const showToast = useCallback(
    (message) => {
      setToast({ message, visible: true });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast((current) => ({ ...current, visible: false })), duration);
    },
    [duration],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return [toast, showToast];
}
