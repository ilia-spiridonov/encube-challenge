import { ChatBubbleLeftIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeInteractionMode, selectInteractionMode } from './state';

const MODES = [
  { icon: HandRaisedIcon, label: 'Pan', value: 'pan' },
  { icon: ChatBubbleLeftIcon, label: 'Comment', value: 'comment' },
] as const;

export const CanvasInteractionModeControls = () => {
  const dispatch = useDispatch();
  const interactionMode = useSelector(selectInteractionMode);

  const handleSelect = useCallback(
    (mode: 'comment' | 'pan') => {
      dispatch(changeInteractionMode(mode));
    },
    [dispatch],
  );

  return (
    <div className="absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-1 rounded-lg bg-white px-2 py-1.5 shadow-md">
      {MODES.map(({ icon: Icon, label, value }) => (
        <button
          className={clsx(
            'flex size-8 cursor-pointer items-center justify-center rounded transition-colors',
            interactionMode === value || (interactionMode === 'panning' && value === 'pan') ?
              'bg-gray-900 text-white'
            : 'text-gray-600 hover:bg-gray-100',
          )}
          key={value}
          onClick={() => {
            handleSelect(value);
          }}
          title={label}
          type="button"
        >
          <Icon className="size-5" />
        </button>
      ))}
    </div>
  );
};
