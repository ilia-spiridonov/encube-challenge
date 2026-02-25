export interface CanvasPoint {
  x: number;
  y: number;
}

interface CanvasItemBodyGeneric<K extends string> {
  kind: K;
}

export interface CanvasItemBodyBox extends CanvasItemBodyGeneric<'box'> {
  backgroundColor: string;
  heightPx: number;
  widthPx: number;
}

export interface CanvasItemBodyComment extends CanvasItemBodyGeneric<'comment'> {
  commentId: string | null;
}

export type CanvasItemBody = CanvasItemBodyBox | CanvasItemBodyComment;

export interface CanvasItem {
  body: CanvasItemBody;
  id: string;
  originPoint: CanvasPoint;
}
