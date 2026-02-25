import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { CommentsListDrawer } from './CommentsListDrawer';
import { selectTopLevelComments } from './state';

export const CommentsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const topLevelComments = useSelector(selectTopLevelComments);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        className="absolute right-4 top-4 cursor-pointer rounded-lg bg-white px-3 py-1.5 text-sm shadow-md hover:bg-gray-50"
        onClick={handleOpen}
        type="button"
      >
        Comments ({topLevelComments.length})
      </button>
      <CommentsListDrawer isOpen={isOpen} onClose={handleClose} />
    </>
  );
};
