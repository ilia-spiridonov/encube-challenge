import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Dialog } from 'radix-ui';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { CommentDrawer } from './CommentDrawer';
import { CommentItem } from './CommentItem';
import { selectTopLevelComments } from './state';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FILTER_OPTIONS = [
  { label: 'Any', value: 'any' },
  { label: 'Open', value: 'open' },
  { label: 'Resolved', value: 'resolved' },
] as const;

type Filter = (typeof FILTER_OPTIONS)[number]['value'];

export const CommentsListDrawer = ({ isOpen, onClose }: Props) => {
  const topLevelComments = useSelector(selectTopLevelComments);
  const [filter, setFilter] = useState<Filter>('any');
  const [openThreadId, setOpenThreadId] = useState<string | null>(null);

  const handleFilterChange = useCallback((value: Filter) => {
    setFilter(value);
  }, []);

  const handleOpenThread = useCallback((commentId: string) => {
    setOpenThreadId(commentId);
  }, []);

  const handleCloseThread = useCallback(() => {
    setOpenThreadId(null);
  }, []);

  const filteredComments = topLevelComments.filter((comment) => {
    if (filter === 'open') {
      return !comment.isResolved;
    }
    if (filter === 'resolved') {
      return comment.isResolved;
    }
    return true;
  });

  return (
    <>
      <Dialog.Root modal={false} open={isOpen}>
        <Dialog.Portal>
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed right-0 top-0 flex h-full w-96 flex-col bg-white shadow-xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onEscapeKeyDown={onClose}
          >
            <div className="flex items-center justify-between border-b p-4">
              <Dialog.Title className="font-semibold text-gray-900">All Comments</Dialog.Title>
              <button
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={onClose}
                type="button"
              >
                <XMarkIcon className="size-5" />
              </button>
            </div>

            <div className="flex gap-1 border-b px-4 py-2">
              {FILTER_OPTIONS.map(({ label, value }) => (
                <button
                  className={clsx(
                    'cursor-pointer rounded px-2.5 py-1 text-xs font-medium',
                    filter === value ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100',
                  )}
                  key={value}
                  onClick={() => {
                    handleFilterChange(value);
                  }}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex-1 divide-y overflow-y-auto">
              {filteredComments.length === 0 ?
                <p className="p-4 text-sm text-gray-500">
                  {filter === 'any' ?
                    'No comments yet.'
                  : filter === 'open' ?
                    'No open comments.'
                  : 'No resolved comments.'}
                </p>
              : filteredComments.map((comment) => (
                  <CommentItem
                    commentId={comment.id}
                    key={comment.id}
                    onOpenThread={handleOpenThread}
                  />
                ))
              }
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {openThreadId != null && (
        <CommentDrawer commentId={openThreadId} isOpen={true} onClose={handleCloseThread} />
      )}
    </>
  );
};
