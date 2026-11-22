/**
 * Pointer position relative to an element's box, normalised to -0.5…0.5 on
 * each axis (0,0 is the centre). Used by the hover-shift and tilt effects.
 */
export function relativePointer(event, element) {
  const rect = element.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) / rect.width - 0.5,
    y: (event.clientY - rect.top) / rect.height - 0.5,
  };
}
