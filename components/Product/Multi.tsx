import * as React from "react";
import FieldArray from "./Multi/NestedMulti";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Variation } from "@/features/MediaManage/UploadVariationMedia";

interface IMultiProps {
  onAnalyze: (value: any) => void;
  loadingAnalyzer: boolean;
}

const defaultValues = {
  values: [
    {
      color: { name: "" },
      size: [{ name: "", price: 0, stock: 0, itemCode: "" }],
    },
  ],
};

const Multi: React.FC<IMultiProps> = (props) => {
  const {
    control,
    register,
    getValues,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FieldValues>();

  const [draggedImages, setDraggedImages] = React.useState<Variation[]>([]);

  const handleAnalyze = () => {
    const newValue = getValues();
    const productArray = newValue.color;

    const updatedProductArray = productArray.map(
      (product: any, index: number) => {
        const image = draggedImages.find(
          (item) => item.value === `color_variation_${index}`
        );
        const colorImage = image ? image.images[0] : "";
        return { ...product, colorImage, images: image ? image.images : [] };
      }
    );
    props.onAnalyze(updatedProductArray);
  };

  const handleNewDragged = (images: Variation[]) => {
    setDraggedImages(images);
  };

  return (
    <>
      <FieldArray
        control={control}
        register={register}
        errors={errors}
        handleNewDragged={handleNewDragged}
      />
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

export default Multi;
