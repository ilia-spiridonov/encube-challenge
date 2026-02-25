import type { CanvasItem } from './types';

export const INITIAL_CANVAS_ITEMS: CanvasItem[] = [
  {
    body: { backgroundColor: '#f87171', heightPx: 160, kind: 'box', widthPx: 160 },
    id: crypto.randomUUID(),
    originPoint: { x: 50, y: 50 },
  },
  {
    body: { backgroundColor: '#34d399', heightPx: 120, kind: 'box', widthPx: 200 },
    id: crypto.randomUUID(),
    originPoint: { x: 280, y: 120 },
  },
  {
    body: { backgroundColor: '#60a5fa', heightPx: 180, kind: 'box', widthPx: 180 },
    id: crypto.randomUUID(),
    originPoint: { x: 100, y: 300 },
  },
  {
    body: { backgroundColor: '#fbbf24', heightPx: 140, kind: 'box', widthPx: 220 },
    id: crypto.randomUUID(),
    originPoint: { x: 550, y: 200 },
  },
  {
    body: { backgroundColor: '#a78bfa', heightPx: 200, kind: 'box', widthPx: 160 },
    id: crypto.randomUUID(),
    originPoint: { x: 400, y: 550 },
  },
];
