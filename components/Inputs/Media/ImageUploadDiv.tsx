import React from "react";
import Image from "next/image";

interface IImageUploadDivProps {
  uploadedImage: string | null;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleClick: () => void;
  folder: string;
}

const ImageUploadDiv: React.FC<IImageUploadDivProps> = ({
  uploadedImage,
  handleDrop,
  handleClick,
  folder,
}) => {
  return (
    <div
      className="w-full h-36 border border-dashed border-gray-400 flex items-center justify-center cursor-pointer"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      onClick={handleClick}
    >
      {uploadedImage ? (
        <Image
          src={`https://cdn.lifesmile.ae/ls/${folder}/${uploadedImage}`}
          alt="Uploaded"
          height={144}
          width={144}
          style={{ filter: "brightness(0.96)" }}
        />
      ) : (
        <span>Drop an image here or click to upload</span>
      )}
    </div>
  );
};

export default ImageUploadDiv;
