import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { changeZoomLevel } from './state';

interface Props {
  canvasElement: HTMLElement | null;
}

export const useWheelZoom = ({ canvasElement }: Props) => {
  const dispatch = useDispatch();

  // Note: we're doing it like this because React's onWheel only attaches passive listeners
  useEffect(() => {
    if (canvasElement == null) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      // Disable browser's own zooming
      event.preventDefault();

      // Note: this is not right if the canvas does not take the entire viewport
      const zoomOrigin = {
        x: event.clientX,
        y: event.clientY,
      };

      // This delta is positive when zooming out, negative when zooming in
      const zoomFactor = Math.pow(1.005, -event.deltaY);

      dispatch(changeZoomLevel({ zoomFactor, zoomOrigin }));
    };

    canvasElement.addEventListener('wheel', handleWheel);

    return () => {
      canvasElement.removeEventListener('wheel', handleWheel);
    };
  }, [canvasElement, dispatch]);
};
