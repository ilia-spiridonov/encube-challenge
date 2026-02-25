import type { CanvasItemBodyBox as CanvasItemBodyBoxType } from './types';

interface Props {
  body: CanvasItemBodyBoxType;
}

export const CanvasItemBodyBox = ({ body }: Props) => {
  return (
    <div
      style={{
        backgroundColor: body.backgroundColor,
        height: body.heightPx,
        width: body.widthPx,
      }}
    />
  );
};
