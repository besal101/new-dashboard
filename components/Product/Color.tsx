import React, {
  ChangeEvent,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { RxCross1 } from "react-icons/rx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleModal } from "@/store/modalSlice";
import DraggableImage from "../DraggableImage";
import { ROUTE } from "@/utils/routes";
import { Variation } from "@/features/MediaManage/UploadVariationMedia";

interface IColorProps {
  onAnalyze: (value: any) => void;
  loadingAnalyzer: boolean;
}

const Color: React.FC<IColorProps> = (props) => {
  const draggedImageIndex = useRef<number | null>(null);
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.variationmedia.variationMedia);
  const [draggedImages, setDraggedImages] = useState<Variation[]>([]);

  useEffect(() => {
    setDraggedImages(media);
    draggedImageIndex.current = null;
  }, [media]);

  const [colorValues, setColorValues] = useState<any[]>([
    { name: "", price: 0, quantity: 0, itemCode: "" },
  ]);

  let addFormFields = () => {
    setColorValues([
      ...colorValues,
      { name: "", price: 0, quantity: 0, itemCode: "" },
    ]);
  };

  const handleChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const newFormValues: any[] = [...colorValues];
    newFormValues[i][e.target.name as any] = e.target.value;
    setColorValues(newFormValues);
  };

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

  let removeFormFields = (i: number) => {
    let newFormValues = [...colorValues];
    newFormValues.splice(i, 1);
    setColorValues(newFormValues);
  };

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

  const handleAnalyze = () => {
    const newArray = colorValues.map((item, index) => {
      const foundItem = draggedImages.find(
        (el) => el.value === `color_variation_${index}`
      );
      return { ...item, images: foundItem ? foundItem.images : [] };
    });

    props.onAnalyze(newArray);
  };

  return (
    <>
      <div className="mt-8">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Code</th>
                <th className="w-1">Quantity</th>
                <th className="w-1">Price</th>
                <th>Actions</th>
                <th className="w-1"></th>
              </tr>
            </thead>
            <tbody>
              {colorValues.length <= 0 && (
                <tr>
                  <td colSpan={5} className="!text-center font-semibold">
                    No Item Available
                  </td>
                </tr>
              )}
              {colorValues.map((element, index) => {
                const variationKey = `color_variation_${index}`;
                return (
                  <React.Fragment key={variationKey}>
                    <tr className="align-top">
                      <td>
                        <input
                          type="text"
                          className="form-input min-w-[200px]"
                          placeholder="Enter Color Name"
                          name="name"
                          value={element.name || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-input min-w-[200px]"
                          placeholder="Enter Item Code"
                          name="itemCode"
                          value={element.itemCode || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-input w-32"
                          name="quantity"
                          value={element.quantity || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-input w-32"
                          name="price"
                          value={element.price || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => removeFormFields(index)}
                        >
                          <RxCross1 className="w-5 h-5 text-red-500" />
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b !border-white-light/40 dark:!border-[#191e3a]">
                      <td colSpan={5}>
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
                                        variationIndex={variationKey} // Pass the index of the color variation
                                        imageIndex={imageIndex} // Pass the index of the image within the color variation
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
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col justify-between px-4 sm:flex-row">
          <div className="mb-6 sm:mb-0">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addFormFields()}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-5">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAnalyze}
          disabled={props.loadingAnalyzer}
        >
          {props.loadingAnalyzer ? "Analyzing..." : "Analyze Variation"}
        </button>
      </div>
    </>
  );
};

export default Color;
