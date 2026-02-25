import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, selectCamera, selectInteractionMode } from './state';
import type { CanvasItem } from './types';

export const useItemKindComment = () => {
  const interactionMode = useSelector(selectInteractionMode);
  const canComment = interactionMode === 'comment';

  const camera = useSelector(selectCamera);

  const dispatch = useDispatch();

  const handleCanvasClick = useCallback(
    (event: React.MouseEvent) => {
      if (!canComment) {
        return;
      }

      let worldX = (camera.originPoint.x + event.clientX) / camera.zoomLevel;
      let worldY = (camera.originPoint.y + event.clientY) / camera.zoomLevel;

      // Make sure the comment icon is right under the cursor, not aside
      worldX -= 32 / 2;
      worldY -= 32 / 2;

      const commentItem: CanvasItem = {
        body: { commentId: null, kind: 'comment' },
        id: crypto.randomUUID(),
        originPoint: { x: worldX, y: worldY },
      };

      dispatch(addItem(commentItem));
    },
    [camera.originPoint.x, camera.originPoint.y, camera.zoomLevel, canComment, dispatch],
  );

  return { handleCanvasClick };
};
