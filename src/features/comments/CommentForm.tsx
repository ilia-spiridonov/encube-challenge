import { type SyntheticEvent, useCallback, useState } from 'react';

interface Props {
  onSecondarySubmit?: (values: { authorName: string; text: string }) => void;
  onSubmit: (values: { authorName: string; text: string }) => void;
  secondarySubmitLabel?: string;
  submitLabel: string;
  textareaPlaceholder: string;
  textareaRows?: number;
}

export const CommentForm = ({
  onSecondarySubmit,
  onSubmit,
  secondarySubmitLabel,
  submitLabel,
  textareaPlaceholder,
  textareaRows = 3,
}: Props) => {
  const [authorName, setAuthorName] = useState('');
  const [text, setText] = useState('');

  const submitWith = useCallback(
    (callback: (values: { authorName: string; text: string }) => void) => {
      if (authorName.trim() === '' || text.trim() === '') {
        return;
      }
      callback({ authorName, text });
      setAuthorName('');
      setText('');
    },
    [authorName, text],
  );

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      submitWith(onSubmit);
    },
    [onSubmit, submitWith],
  );

  const handleSecondarySubmit = useCallback(() => {
    if (onSecondarySubmit != null) {
      submitWith(onSecondarySubmit);
    }
  }, [onSecondarySubmit, submitWith]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        className="rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          setAuthorName(e.target.value);
        }}
        placeholder="Your name"
        type="text"
        value={authorName}
      />
      <textarea
        className="resize-none rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder={textareaPlaceholder}
        rows={textareaRows}
        value={text}
      />
      <div className="flex gap-2">
        <button
          className="cursor-pointer rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          type="submit"
        >
          {submitLabel}
        </button>
        {onSecondarySubmit != null && secondarySubmitLabel != null && (
          <button
            className="cursor-pointer rounded border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={handleSecondarySubmit}
            type="button"
          >
            {secondarySubmitLabel}
          </button>
        )}
      </div>
    </form>
  );
};
