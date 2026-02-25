import { CommentCanvasItem } from '../comments';
import type { CanvasItemBodyComment as CanvasItemBodyCommentType } from './types';

interface Props {
  body: CanvasItemBodyCommentType;
  itemId: string;
}

export const CanvasItemBodyComment = ({ body, itemId }: Props) => {
  return <CommentCanvasItem canvasItemId={itemId} commentId={body.commentId} />;
};
