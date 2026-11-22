import { useEffect, useRef } from 'react';
import './CursorSpark.css';

const HIDE_AFTER_MS = 420;

/**
 * A single restrained sparkle that follows the mouse and fades shortly after
 * the pointer stops. Ignored for touch input (and hidden via CSS on hover:none).
 * Updates the DOM directly to avoid a React render per pointer move.
 */
export default function CursorSpark() {
  const ref = useRef(null);

  useEffect(() => {
    const spark = ref.current;
    let hideTimer = 0;

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      spark.style.left = `${event.clientX}px`;
      spark.style.top = `${event.clientY}px`;
      spark.classList.add('on');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => spark.classList.remove('on'), HIDE_AFTER_MS);
    };
    const onPointerLeave = () => spark.classList.remove('on');

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerleave', onPointerLeave);
    return () => {
      clearTimeout(hideTimer);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor-spark" aria-hidden="true">
      ✳
    </div>
  );
}
