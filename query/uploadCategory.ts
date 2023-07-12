import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "./constants";
import { queryClient } from "@/providers/ReactQueryProvider";

export interface UploadCategoryType {
  id?: number;
  name: string;
  arName?: string;
  ruName?: string;
  parentCategory?: string;
  description?: string;
  image: string | null;
  slug: string;
  title?: string;
  published?: boolean;
}

const uploadCategory = async (data: UploadCategoryType) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/category`,
    data
  );
  return response.data;
};

const useUploadCategory = () => {
  return useMutation((input: UploadCategoryType) => uploadCategory(input), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.getCategory]);
    },
  });
};

const updateCategory = async (data: UploadCategoryType) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/category/${data.id}`,
    data
  );
  return response.data;
};

const useUpdateCategory = () => {
  return useMutation((input: UploadCategoryType) => updateCategory(input), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.getCategory]);
      queryClient.invalidateQueries([queryKeys.getSingleCategory]);
    },
  });
};

export { useUploadCategory, useUpdateCategory };
