import { useEffect, useState } from 'react';

export default function useAlignedClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let intervalId = null;
    const tick = () => setNow(new Date());
    const delay = 60000 - (Date.now() % 60000);

    const timeoutId = setTimeout(() => {
      tick();
      intervalId = setInterval(tick, 60000);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return now;
}