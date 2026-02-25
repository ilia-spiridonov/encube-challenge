import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeZoomLevel, selectCamera } from './state';

const ZOOM_FACTOR = 1.25;

export const CanvasZoomControls = () => {
  const dispatch = useDispatch();
  const camera = useSelector(selectCamera);

  const zoomOrigin = useCallback(
    () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }),
    [],
  );

  const handleZoomOut = useCallback(() => {
    dispatch(changeZoomLevel({ zoomFactor: 1 / ZOOM_FACTOR, zoomOrigin: zoomOrigin() }));
  }, [dispatch, zoomOrigin]);

  const handleZoomIn = useCallback(() => {
    dispatch(changeZoomLevel({ zoomFactor: ZOOM_FACTOR, zoomOrigin: zoomOrigin() }));
  }, [dispatch, zoomOrigin]);

  const zoomPercentage = Math.round(camera.zoomLevel * 100);

  return (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-lg bg-white px-2 py-1.5 shadow-md">
      <button
        className="flex size-7 cursor-pointer items-center justify-center rounded hover:bg-gray-100"
        onClick={handleZoomOut}
        type="button"
      >
        −
      </button>
      <span className="min-w-12 text-center text-sm tabular-nums">{zoomPercentage}%</span>
      <button
        className="flex size-7 cursor-pointer items-center justify-center rounded hover:bg-gray-100"
        onClick={handleZoomIn}
        type="button"
      >
        +
      </button>
    </div>
  );
};
