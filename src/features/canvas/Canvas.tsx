import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { CommentsButton } from '../comments';
import * as styles from './Canvas.module.css';
import { CanvasInteractionModeControls } from './CanvasInteractionModeControls';
import { CanvasItem } from './CanvasItem';
import { CanvasZoomControls } from './CanvasZoomControls';
import { selectInteractionMode, selectItems } from './state';
import { useItemKindComment } from './useItemKindComment';
import { usePan } from './usePan';
import { useWheelZoom } from './useWheelZoom';

export const Canvas = () => {
  const [canvasElement, setCanvasElement] = useState<HTMLElement | null>(null);

  useWheelZoom({ canvasElement });
  usePan({ canvasElement });

  const interactionMode = useSelector(selectInteractionMode);
  const items = useSelector(selectItems);

  const { handleCanvasClick } = useItemKindComment();

  return (
    <div className={styles['Canvas']}>
      <div
        className={clsx(styles['Canvas__content'], {
          'cursor-cell': interactionMode === 'comment',
          'cursor-grab': interactionMode === 'pan',
          'cursor-grabbing': interactionMode === 'panning',
        })}
        onClick={handleCanvasClick}
        ref={setCanvasElement}
      >
        {items.map((item) => (
          <CanvasItem item={item} key={item.id} />
        ))}
      </div>

      <CanvasInteractionModeControls />
      <CanvasZoomControls />
      <CommentsButton />
    </div>
  );
};
