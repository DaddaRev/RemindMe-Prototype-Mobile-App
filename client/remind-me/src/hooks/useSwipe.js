import { useRef, useEffect } from 'react';

/**
 * Custom hook to detect swipe gestures and keyboard arrow keys
 * @param {Function} onSwipeLeft - Callback when swiping left or pressing right arrow
 * @param {Function} onSwipeRight - Callback when swiping right or pressing left arrow
 * @param {number} threshold - Minimum distance (in px) to register a swipe (default: 50)
 */
function useSwipe(onSwipeLeft, onSwipeRight, threshold = 50) {
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEnd.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' && onSwipeLeft) {
      e.preventDefault();
      onSwipeLeft();
    }
    if (e.key === 'ArrowLeft' && onSwipeRight) {
      e.preventDefault();
      onSwipeRight();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
}

export default useSwipe;
