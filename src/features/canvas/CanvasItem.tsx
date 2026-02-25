import { useSelector } from 'react-redux';

import * as styles from './CanvasItem.module.css';
import { CanvasItemBody } from './CanvasItemBody';
import { selectCamera } from './state';
import type { CanvasItem as CanvasItemType } from './types';

interface Props {
  item: CanvasItemType;
}

export const CanvasItem = ({ item }: Props) => {
  const camera = useSelector(selectCamera);
  const { body, originPoint } = item;

  const translateX = originPoint.x * camera.zoomLevel - camera.originPoint.x;
  const translateY = originPoint.y * camera.zoomLevel - camera.originPoint.y;

  return (
    <div
      className={styles['CanvasItem']}
      style={{
        transform: `translate(${translateX.toString()}px, ${translateY.toString()}px) scale(${camera.zoomLevel.toString()})`,
      }}
    >
      <CanvasItemBody body={body} itemId={item.id} />
    </div>
  );
};
