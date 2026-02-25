import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../types';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';
import {
  addComment,
  changeCommentIsResolved,
  selectChildComments,
  selectCommentById,
} from './state';

interface Props {
  commentId: string;
}

export const CommentThread = ({ commentId }: Props) => {
  const dispatch = useDispatch();
  const comment = useSelector((state: RootState) => selectCommentById(state, commentId));
  const replies = useSelector((state: RootState) => selectChildComments(state, commentId));

  const handleReplySubmit = useCallback(
    ({ authorName, text }: { authorName: string; text: string }) => {
      dispatch(
        addComment({
          authorName,
          createdAt: Date.now(),
          id: crypto.randomUUID(),
          isResolved: false,
          parentId: commentId,
          text,
        }),
      );
    },
    [commentId, dispatch],
  );

  const handleReplyAndToggleResolved = useCallback(
    (values: { authorName: string; text: string }) => {
      handleReplySubmit(values);
      dispatch(
        changeCommentIsResolved({ id: commentId, newIsResolved: !(comment?.isResolved ?? false) }),
      );
    },
    [comment?.isResolved, commentId, dispatch, handleReplySubmit],
  );

  if (comment == null) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b">
        <CommentItem commentId={commentId} />
      </div>

      <div className="flex-1 overflow-y-auto">
        {replies != null && replies.length > 0 && (
          <div className="px-4 py-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Replies
            </p>
            <div className="space-y-4 border-l-2 border-gray-100 pl-3">
              {replies.map((reply) => (
                <CommentItem commentId={reply.id} key={reply.id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t px-4 py-4">
        <CommentForm
          onSecondarySubmit={handleReplyAndToggleResolved}
          onSubmit={handleReplySubmit}
          secondarySubmitLabel={comment.isResolved ? 'Reply and reopen' : 'Reply and resolve'}
          submitLabel="Reply"
          textareaPlaceholder="Reply..."
          textareaRows={2}
        />
      </div>
    </div>
  );
};
