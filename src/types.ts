import { type canvasReducer } from './features/canvas';
import { type commentsReducer } from './features/comments';

export interface RootState {
  canvas: ReturnType<typeof canvasReducer>;
  comments: ReturnType<typeof commentsReducer>;
}
