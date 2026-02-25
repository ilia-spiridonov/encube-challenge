import { configureStore } from '@reduxjs/toolkit';

import { canvasReducer } from './features/canvas';
import { commentsReducer } from './features/comments';

export const createAppStore = () =>
  configureStore({
    reducer: {
      canvas: canvasReducer,
      comments: commentsReducer,
    },
  });
