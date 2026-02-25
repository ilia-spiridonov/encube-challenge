import {
  ArrowRightIcon,
  CheckCircleIcon as CheckCircleIconOutline,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../types';
import { CommentTextEditor } from './CommentTextEditor';
import { changeCommentIsResolved, selectCommentById } from './state';

interface Props {
  commentId: string;
  onOpenThread?: (commentId: string) => void;
}

export const CommentItem = ({ commentId, onOpenThread }: Props) => {
  const dispatch = useDispatch();
  const comment = useSelector((state: RootState) => selectCommentById(state, commentId));
  const [isEditing, setIsEditing] = useState(false);

  const handleEditStart = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditEnd = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleToggleResolved = useCallback(() => {
    if (comment != null) {
      dispatch(changeCommentIsResolved({ id: commentId, newIsResolved: !comment.isResolved }));
    }
  }, [comment, commentId, dispatch]);

  if (comment == null) {
    return null;
  }

  return (
    <div className="group relative p-4">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="min-w-0 break-words font-medium text-gray-900">{comment.authorName}</span>
        <span className="shrink-0 text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
        {comment.parentId == null && comment.isResolved && (
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-green-600">
            <CheckCircleIconSolid className="size-3" />
            Resolved
          </span>
        )}
      </div>

      <CommentTextEditor
        commentId={comment.id}
        isEditing={isEditing}
        onEditEnd={handleEditEnd}
        text={comment.text}
      />

      {!isEditing && (
        <div className="absolute right-2 top-2 hidden items-center gap-0.5 rounded-md border border-gray-200 bg-white p-0.5 shadow-sm group-hover:flex">
          <button
            className="flex size-6 cursor-pointer items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            onClick={handleEditStart}
            title="Edit"
            type="button"
          >
            <PencilIcon className="size-3.5" />
          </button>
          {comment.parentId == null && (
            <button
              className={clsx(
                'flex size-6 cursor-pointer items-center justify-center rounded hover:bg-gray-100',
                comment.isResolved ?
                  'text-green-600 hover:text-green-700'
                : 'text-gray-400 hover:text-gray-600',
              )}
              onClick={handleToggleResolved}
              title={comment.isResolved ? 'Mark as unresolved' : 'Mark as resolved'}
              type="button"
            >
              {comment.isResolved ?
                <CheckCircleIconSolid className="size-3.5" />
              : <CheckCircleIconOutline className="size-3.5" />}
            </button>
          )}
          {onOpenThread != null && (
            <button
              className="flex size-6 cursor-pointer items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              onClick={() => {
                onOpenThread(commentId);
              }}
              title="View thread"
              type="button"
            >
              <ArrowRightIcon className="size-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
