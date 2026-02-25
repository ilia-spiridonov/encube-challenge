import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { Popover } from 'radix-ui';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { changeItemBody, deleteItem } from '../canvas/state';
import { CommentForm } from './CommentForm';
import { addComment } from './state';

interface Props {
  canvasItemId: string;
  onCommentCreated: () => void;
}

export const CommentNewPopover = ({ canvasItemId, onCommentCreated }: Props) => {
  const dispatch = useDispatch();
  const wasSubmittedRef = useRef(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !wasSubmittedRef.current) {
        dispatch(deleteItem({ itemId: canvasItemId }));
      }
    },
    [canvasItemId, dispatch],
  );

  const handleSubmit = useCallback(
    ({ authorName, text }: { authorName: string; text: string }) => {
      const commentId = crypto.randomUUID();
      wasSubmittedRef.current = true;

      dispatch(
        addComment({
          authorName,
          createdAt: Date.now(),
          id: commentId,
          isResolved: false,
          parentId: null,
          text,
        }),
      );

      dispatch(
        changeItemBody({
          itemId: canvasItemId,
          newBody: { commentId, kind: 'comment' },
        }),
      );

      onCommentCreated();
    },
    [canvasItemId, dispatch, onCommentCreated],
  );

  return (
    <Popover.Root defaultOpen onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button className="cursor-pointer hover:opacity-50" type="button">
          <ChatBubbleLeftIcon className="size-8" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-72 rounded-lg bg-white p-4 shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
          side="top"
          sideOffset={8}
        >
          <CommentForm
            onSubmit={handleSubmit}
            submitLabel="Add comment"
            textareaPlaceholder="Add a comment..."
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
