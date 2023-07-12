import Image from "next/image";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableImageProps {
  src: string;
  alt: string;
  variationIndex?: string;
  imageIndex: number;
  moveImage: (
    dragIndex: number,
    hoverIndex: number,
    variationIndex: string
  ) => void;
}

interface DragItem {
  type: string;
  variationIndex?: string;
  imageIndex: number;
}

const DraggableImage: React.FC<DraggableImageProps> = ({
  src,
  alt,
  variationIndex,
  imageIndex,
  moveImage,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "image",
    hover(item: DragItem) {
      if (!ref.current) return;
      const dragIndex = item.imageIndex;
      const hoverIndex = imageIndex;
      if (dragIndex === hoverIndex) return;
      moveImage(dragIndex, hoverIndex, variationIndex!);
      item.imageIndex = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: "image", variationIndex, imageIndex } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    type: "image",
    canDrag() {
      return true;
    },
    isDragging(monitor) {
      const item = monitor.getItem() as DragItem;
      return (
        item.variationIndex === variationIndex && item.imageIndex === imageIndex
      );
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }}>
      <Image
        src={src}
        alt={alt}
        width={120}
        height={120}
        style={{
          filter: "brightness(0.96)",
        }}
      />
    </div>
  );
};

export default DraggableImage;
