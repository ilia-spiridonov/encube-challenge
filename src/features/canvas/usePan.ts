import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeInteractionMode, changePan, selectInteractionMode } from './state';

interface Props {
  canvasElement: HTMLElement | null;
}

export const usePan = ({ canvasElement }: Props) => {
  const interactionMode = useSelector(selectInteractionMode);
  const canPan = interactionMode === 'pan' || interactionMode === 'panning';

  const dispatch = useDispatch();

  useEffect(() => {
    if (canvasElement == null || !canPan) {
      return;
    }

    const handlePointerDown = () => {
      dispatch(changeInteractionMode('panning'));

      const handlePointerMove = (moveEvent: PointerEvent) => {
        dispatch(changePan({ deltaX: moveEvent.movementX, deltaY: moveEvent.movementY }));
      };

      const handlePointerUp = () => {
        dispatch(changeInteractionMode('pan'));
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    };

    canvasElement.addEventListener('pointerdown', handlePointerDown);

    return () => {
      canvasElement.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [canPan, canvasElement, dispatch]);
};
