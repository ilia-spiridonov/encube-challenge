import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { useCallback, useState } from 'react';

import { CommentDrawer } from './CommentDrawer';
import { CommentNewPopover } from './CommentNewPopover';

interface Props {
  canvasItemId: string;
  commentId: string | null;
}

export const CommentCanvasItem = ({ canvasItemId, commentId }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCommentCreated = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleIconClick = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  if (commentId == null) {
    return (
      <CommentNewPopover canvasItemId={canvasItemId} onCommentCreated={handleCommentCreated} />
    );
  }

  return (
    <>
      <button className="cursor-pointer hover:opacity-50" onClick={handleIconClick} type="button">
        <ChatBubbleLeftIcon className="size-8" />
      </button>
      <CommentDrawer commentId={commentId} isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </>
  );
};
