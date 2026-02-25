import { memo } from 'react';

import { CanvasItemBodyBox } from './CanvasItemBodyBox';
import { CanvasItemBodyComment } from './CanvasItemBodyComment';
import type { CanvasItemBody as CanvasItemBodyType } from './types';

interface Props {
  body: CanvasItemBodyType;
  itemId: string;
}

export const CanvasItemBody = memo(function CanvasItemBody({ body, itemId }: Props) {
  if (body.kind === 'comment') {
    return <CanvasItemBodyComment body={body} itemId={itemId} />;
  }

  return <CanvasItemBodyBox body={body} />;
});
