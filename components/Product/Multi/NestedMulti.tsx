import VariationInput from "@/components/Inputs/VariationInput";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import NestedArray from "./NestedField";
import { Variation } from "@/features/MediaManage/UploadVariationMedia";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleModal } from "@/store/modalSlice";
import DraggableImage from "@/components/DraggableImage";
import { ROUTE } from "@/utils/routes";

interface IFieldsArrayProps {
  control: any;
  register: any;
  errors: any;
  handleNewDragged: (images: Variation[]) => void;
}

const Fields: React.FC<IFieldsArrayProps> = ({
  control,
  register,
  errors,
  handleNewDragged,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "color",
  });
  const draggedImageIndex = useRef<number | null>(null);
  const dispatch = useAppDispatch();
  const [draggedImages, setDraggedImages] = useState<Variation[]>([]);
  const media = useAppSelector((state) => state.variationmedia.variationMedia);

  useEffect(() => {
    append({
      name: "",
      size: [{ name: "", price: 0, stock: 0, itemCode: "" }],
    });
  }, [append]);

  useEffect(() => {
    setDraggedImages(media);
    draggedImageIndex.current = null;
  }, [media]);

  useEffect(() => {
    handleNewDragged(draggedImages); // Call the handleNewDragged function when draggedImages change
  }, [draggedImages, handleNewDragged]);

  const modalHandle = useCallback(
    (value: string) => {
      dispatch(
        toggleModal({
          show: true,
          modal: "uploadVariationImage",
          payload: value,
        })
      );
    },
    [dispatch]
  );

  const moveImage = (
    dragIndex: number,
    hoverIndex: number,
    variationIndex: string
  ) => {
    if (dragIndex === hoverIndex) {
      return;
    }
    setDraggedImages((prevDraggedImages) => {
      const newDraggedImages = prevDraggedImages.map((variation, index) => {
        if (`color_variation_${index}` === variationIndex) {
          const newImages = [...variation.images];
          const draggedImage = newImages[dragIndex];
          newImages.splice(dragIndex, 1);
          newImages.splice(hoverIndex, 0, draggedImage);
          return { ...variation, images: newImages };
        }
        return variation;
      });
      return newDraggedImages;
    });
  };

  return (
    <>
      <div className="mt-8">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="w-1/5">Color Name</th>
                <th className="w-3/5">Media</th>
                <th className="w-1/5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.length <= 0 && (
                <tr>
                  <td colSpan={5} className="!text-center font-semibold">
                    No Item Available
                  </td>
                </tr>
              )}
              {fields.map((element, index) => {
                const variationKey = `color_variation_${index}`;
                return (
                  <React.Fragment key={variationKey}>
                    <tr className="align-top">
                      <td>
                        <VariationInput
                          id={`color[${index}].name`}
                          label="Color Name"
                          disabled={false}
                          register={register}
                          type="text"
                          required
                          className="form-input flex-1"
                          errors={errors}
                        />
                      </td>
                      <td>
                        {draggedImages.length > 0 ? (
                          <DndProvider backend={HTML5Backend}>
                            <label htmlFor={`previewimage_${index}`}>
                              Preview Image
                            </label>
                            <div
                              className="w-full h-auto min-h-[100px] py-3 border border-dashed border-gray-400 items-center justify-center cursor-pointer flex flex-row flex-wrap gap-2"
                              id={`previewimage_${index}`}
                              role="button"
                              onClick={(e) => modalHandle(variationKey)}
                            >
                              {draggedImages[index]?.images.length > 0 ? (
                                draggedImages[index]?.images.map(
                                  (item, imageIndex) => (
                                    <div className="" key={imageIndex}>
                                      <DraggableImage
                                        src={`${ROUTE.IMAGE_CDN}/product/${item}`}
                                        alt="main image"
                                        variationIndex={variationKey}
                                        imageIndex={imageIndex}
                                        moveImage={moveImage}
                                      />
                                    </div>
                                  )
                                )
                              ) : (
                                <span>Click to upload main Image</span>
                              )}
                            </div>
                          </DndProvider>
                        ) : (
                          <div
                            className="w-full h-auto min-h-[100px] py-3 border border-dashed border-gray-400 items-center justify-center cursor-pointer flex flex-row flex-wrap gap-2"
                            id="previewimage"
                            role="button"
                            onClick={(e) =>
                              modalHandle(`color_variation_${index}`)
                            }
                          >
                            <span>Click to upload main Image</span>
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="flex flex-row gap-2 mt-4 justify-end">
                          <button
                            type="button"
                            className="btn btn-primary text-xs px-3 py-1.5"
                            onClick={() => {
                              append({});
                            }}
                          >
                            Add Color
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary text-xs px-3 py-1.5"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <NestedArray
                          nestIndex={index}
                          {...{ control, register, errors }}
                        />
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Fields;
