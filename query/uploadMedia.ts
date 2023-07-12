import { useMutation, MutationFunction } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

const uploadImage: MutationFunction<any, [File, string]> = async (params) => {
  const [file, folder] = params;

  const formData = new FormData();
  formData.append("file", file);

  const response: AxiosResponse = await axios.post("/api/media", formData, {
    params: { folder },
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

interface UploadMediaQueryResult {
  handleImageUpload: (
    file: File,
    folder: string
  ) => Promise<{
    success: boolean;
    data: any;
  }>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  successData: any;
}

const useUploadMediaQuery = (): UploadMediaQueryResult => {
  const imageUploadMutation = useMutation<any, Error, [File, string]>(
    ["UPLOADIMAGES"],
    uploadImage
  );

  const handleImageUpload = async (
    file: File,
    folder: string
  ): Promise<{ success: boolean; data: any }> => {
    try {
      const responseData = await imageUploadMutation.mutateAsync([
        file,
        folder,
      ]);

      return { success: true, data: responseData };
    } catch (error) {
      console.error("Error uploading image:", error);
      return { success: false, data: null };
    }
  };

  return {
    handleImageUpload,
    isLoading: imageUploadMutation.isLoading,
    isError: imageUploadMutation.isError,
    isSuccess: imageUploadMutation.isSuccess,
    successData: imageUploadMutation.data,
  };
};

export { useUploadMediaQuery };
