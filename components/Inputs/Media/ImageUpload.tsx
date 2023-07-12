import React, { useState } from "react";
import ImageUploadDiv from "./ImageUploadDiv";
import { useUploadMediaQuery } from "@/query/uploadMedia";

interface IImageUploadProps {
  onImageUpload: (image: string | null) => void;
  folder: string;
}

const ImageUpload: React.FC<IImageUploadProps> = ({
  onImageUpload,
  folder,
}) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { handleImageUpload, isLoading, isError, isSuccess } =
    useUploadMediaQuery();

  const handleFileChange = async (file: File, folder: string) => {
    if (file) {
      try {
        const response = await handleImageUpload(file, folder);
        if (response?.success) {
          setUploadedImage(response.data.data);
          onImageUpload(response.data.data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file, folder);
    }
  };

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileChange(file, folder);
      }
    };
    input.click();
  };

  return (
    <div>
      <div className="mb-5">
        {isLoading && <p className="text-green-500">Uploading image...</p>}
        {isError && <p className="text-red-500">Error uploading image</p>}
        <ImageUploadDiv
          uploadedImage={uploadedImage}
          handleDrop={handleDrop}
          handleClick={handleClick}
          folder={folder}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
