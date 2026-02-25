import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from 'radix-ui';
import { useSelector } from 'react-redux';

import type { RootState } from '../../types';
import { CommentThread } from './CommentThread';
import { selectCommentById } from './state';

interface Props {
  commentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentDrawer = ({ commentId, isOpen, onClose }: Props) => {
  const comment = useSelector((state: RootState) => selectCommentById(state, commentId));

  if (comment == null) {
    return null;
  }

  return (
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
            <Dialog.Title className="font-semibold text-gray-900">Comment</Dialog.Title>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={onClose}
              type="button"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <CommentThread commentId={commentId} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
