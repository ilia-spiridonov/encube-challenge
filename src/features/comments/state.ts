import { createAction, createReducer, createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../types';
import type { Comment } from './types';

interface CommentsState {
  byId: Record<Comment['id'], Comment>;
  byParentId: Record<Comment['id'], Comment['id'][]>;
}

const initialState: CommentsState = {
  byId: {},
  byParentId: {},
};

export const addComment = createAction<Comment>('comments/addComment');

export const changeCommentText = createAction<{ id: Comment['id']; newText: Comment['text'] }>(
  'comments/changeCommentText',
);

export const changeCommentIsResolved = createAction<{
  id: Comment['id'];
  newIsResolved: Comment['isResolved'];
}>('comments/changeCommentIsResolved');

export const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addComment, (state, action) => {
      const comment = action.payload;
      state.byId[comment.id] = comment;
      if (comment.parentId != null) {
        (state.byParentId[comment.parentId] ??= []).push(comment.id);
      }
    })
    .addCase(changeCommentText, (state, action) => {
      const comment = state.byId[action.payload.id];
      if (comment != null) {
        comment.text = action.payload.newText;
      }
    })
    .addCase(changeCommentIsResolved, (state, action) => {
      const comment = state.byId[action.payload.id];
      if (comment != null) {
        comment.isResolved = action.payload.newIsResolved;
      }
    });
});

export const selectTopLevelComments = createSelector(
  (state: RootState) => state.comments.byId,
  (byId) => Object.values(byId).filter((comment) => comment.parentId == null),
);

export const selectCommentById = (state: RootState, id: Comment['id']) => state.comments.byId[id];

export const selectChildComments = createSelector(
  (state: RootState, id: Comment['id']) => state.comments.byParentId[id],
  (state: RootState) => state.comments.byId,
  (childIds, byId) =>
    childIds?.map((childId) => byId[childId]).filter((comment) => comment != null),
);
