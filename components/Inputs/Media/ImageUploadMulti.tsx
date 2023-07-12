import React from "react";
import Image from "next/image";

interface IImageUploadMultiProps {
  uploadedImage?: string | null;
  uploadedImages: string[];
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleClick: () => void;
  folder: string;
  mode: "single" | "multi";
}

const ImageUploadMulti: React.FC<IImageUploadMultiProps> = ({
  uploadedImage,
  handleDrop,
  handleClick,
  folder,
  uploadedImages,
  mode = "single",
}) => {
  return (
    <div
      className="w-full h-72 border border-dashed border-red-500 flex items-center justify-center cursor-pointer"
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      onClick={handleClick}
    >
      {mode === "single" &&
        (uploadedImage ? (
          <Image
            src={`https://cdn.lifesmile.ae/ls/${folder}/${uploadedImage}`}
            alt="Uploaded"
            height={144}
            width={144}
            style={{ filter: "brightness(0.96)", padding: "0.5rem" }}
          />
        ) : (
          <span className="text-xl text-secondary">
            Drop an image here or click to upload
          </span>
        ))}
      {mode === "multi" &&
        (uploadedImages.length > 0 ? (
          <div className="flex flex-wrap gap-1 flex-row">
            {uploadedImages.map((image, i) => (
              <Image
                src={`https://cdn.lifesmile.ae/ls/${folder}/${image}`}
                alt="Uploaded"
                height={144}
                width={144}
                style={{ filter: "brightness(0.96)", padding: "0.5rem" }}
                key={i}
              />
            ))}
          </div>
        ) : (
          <span className="text-xl text-secondary">
            Drop multiple image here or click to upload
          </span>
        ))}
    </div>
  );
};

export default ImageUploadMulti;
