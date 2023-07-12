import React, { useState } from "react";
import { useUploadMediaQuery } from "@/query/uploadMedia";
import ImageUploadMulti from "../Inputs/Media/ImageUploadMulti";
import { useAppDispatch } from "@/hooks/useRedux";
import { setMultiMedia } from "@/features/MediaManage/UploadVariationMedia";

interface IImageUploadProps {
  handleClose: () => void;
  folder: string;
  value: string; // New prop for specifying the mode
}

const variationImageUpload: React.FC<IImageUploadProps> = ({
  folder,
  value,
  handleClose,
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const { handleImageUpload, isLoading, isError, isSuccess } =
    useUploadMediaQuery();

  const handleFileChange = async (files: FileList, folder: string) => {
    const uploadedFiles = Array.from(files);
    const uploadedImageUrls: string[] = [];

    try {
      for (const file of uploadedFiles) {
        const response = await handleImageUpload(file, folder);
        if (response?.success) {
          uploadedImageUrls.push(response.data.data);
        }
      }
      setUploadedImages((prevImages) => [...prevImages, ...uploadedImageUrls]);
      dispatch(setMultiMedia({ images: uploadedImageUrls, value })); // Dispatch the action
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      handleFileChange(files, folder);
    }
  };

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        handleFileChange(files, folder);
      }
    };
    input.click();
  };

  return (
    <div className="">
      <div className="mb-5">
        {isLoading && <p className="text-green-500">Uploading image...</p>}
        {isError && <p className="text-red-500">Error uploading image</p>}
        <ImageUploadMulti
          uploadedImages={uploadedImages} // Pass the uploaded images array
          handleDrop={handleDrop}
          handleClick={handleClick}
          folder={folder}
          mode="multi"
        />
      </div>
      <div className="flex flex-row justify-end first-line:">
        <button type="button" className="btn btn-primary" onClick={handleClose}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default variationImageUpload;
