import React, { useState } from "react";
import { useUploadMediaQuery } from "@/query/uploadMedia";
import ImageUploadMulti from "../Inputs/Media/ImageUploadMulti";
import { useAppDispatch } from "@/hooks/useRedux";
import { setMedia } from "@/features/MediaManage/UploadMedia";

interface IImageUploadProps {
  handleClose: () => void;
  folder: string;
  mode: "single" | "multi"; // New prop for specifying the mode
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  folder,
  mode = "single",
  handleClose,
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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

      if (mode === "single") {
        setUploadedImage(uploadedImageUrls[0] || null);
        dispatch(setMedia({ image: uploadedImageUrls[0] || null }));
      } else {
        setUploadedImages((prevImages) => [
          ...prevImages,
          ...uploadedImageUrls,
        ]);
        dispatch(setMedia({ images: uploadedImageUrls }));
      }
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
    input.multiple = mode === "multi"; // Allow multiple file selection based on the mode
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
          uploadedImage={uploadedImage}
          uploadedImages={uploadedImages} // Pass the uploaded images array
          handleDrop={handleDrop}
          handleClick={handleClick}
          folder={folder}
          mode={mode}
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

export default ImageUpload;
