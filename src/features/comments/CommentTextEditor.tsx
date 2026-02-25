import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeCommentText } from './state';

interface Props {
  commentId: string;
  isEditing: boolean;
  onEditEnd: () => void;
  text: string;
}

export const CommentTextEditor = ({ commentId, isEditing, onEditEnd, text }: Props) => {
  const dispatch = useDispatch();
  const [draft, setDraft] = useState(text);

  useEffect(() => {
    if (isEditing) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraft(text);
    }
  }, [isEditing, text]);

  const handleSave = useCallback(() => {
    const trimmed = draft.trim();
    if (trimmed !== '') {
      dispatch(changeCommentText({ id: commentId, newText: trimmed }));
    }
    onEditEnd();
  }, [commentId, dispatch, draft, onEditEnd]);

  if (isEditing) {
    return (
      <div className="flex flex-col gap-1.5">
        <textarea
          autoFocus
          className="resize-none rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setDraft(e.target.value);
          }}
          rows={3}
          value={draft}
        />
        <button
          className="self-start cursor-pointer rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
          onClick={handleSave}
          type="button"
        >
          Save
        </button>
      </div>
    );
  }

  return <p className="break-words text-sm text-gray-700">{text}</p>;
};
