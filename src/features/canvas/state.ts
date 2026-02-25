import { createAction, createReducer } from '@reduxjs/toolkit';

import type { RootState } from '../../types';
import { INITIAL_CANVAS_ITEMS } from './config';
import type { CanvasItem, CanvasItemBody, CanvasPoint } from './types';

type CanvasInteractionMode = 'pan' | 'panning' | 'comment';

interface CanvasState {
  camera: {
    originPoint: CanvasPoint;
    zoomLevel: number;
  };
  interactionMode: CanvasInteractionMode;
  items: CanvasItem[];
}

const initialState: CanvasState = {
  camera: {
    originPoint: { x: 0, y: 0 },
    zoomLevel: 1.0,
  },
  interactionMode: 'pan',
  items: INITIAL_CANVAS_ITEMS,
};

export const changeZoomLevel = createAction<{ zoomFactor: number; zoomOrigin: CanvasPoint }>(
  'canvas/changeZoomLevel',
);

export const changeInteractionMode = createAction<CanvasInteractionMode>(
  'canvas/changeInteractionMode',
);

export const changePan = createAction<{ deltaX: number; deltaY: number }>('canvas/changePan');

export const addItem = createAction<CanvasItem>('canvas/addItem');

export const changeItemBody = createAction<{ itemId: CanvasItem['id']; newBody: CanvasItemBody }>(
  'canvas/changeItemBody',
);

export const deleteItem = createAction<{ itemId: CanvasItem['id'] }>('canvas/deleteItem');

export const canvasReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeZoomLevel, (state, action) => {
      const { zoomFactor, zoomOrigin } = action.payload;
      const worldX = (zoomOrigin.x + state.camera.originPoint.x) / state.camera.zoomLevel;
      const worldY = (zoomOrigin.y + state.camera.originPoint.y) / state.camera.zoomLevel;
      const newZoomLevel = Math.max(0.25, Math.min(4.0, zoomFactor * state.camera.zoomLevel));

      // After zoomLevel -> newZoomLevel, the point needs to maintain its screen position
      // So like worldX * newZoomLevel - newCameraX = zoomOrigin.x
      // Therefore
      const newCameraX = worldX * newZoomLevel - zoomOrigin.x;
      const newCameraY = worldY * newZoomLevel - zoomOrigin.y;

      state.camera.originPoint.x = newCameraX;
      state.camera.originPoint.y = newCameraY;
      state.camera.zoomLevel = newZoomLevel;
    })
    .addCase(changeInteractionMode, (state, action) => {
      state.interactionMode = action.payload;
    })
    .addCase(changePan, (state, action) => {
      state.camera.originPoint.x -= action.payload.deltaX;
      state.camera.originPoint.y -= action.payload.deltaY;
    })
    .addCase(addItem, (state, action) => {
      state.items.push(action.payload);
    })
    .addCase(changeItemBody, (state, action) => {
      for (const item of state.items) {
        if (item.id === action.payload.itemId) {
          item.body = action.payload.newBody;
          break;
        }
      }
    })
    .addCase(deleteItem, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.itemId);
    });
});

export const selectCamera = (state: RootState) => state.canvas.camera;

export const selectInteractionMode = (state: RootState) => state.canvas.interactionMode;

export const selectItems = (state: RootState) => state.canvas.items;
