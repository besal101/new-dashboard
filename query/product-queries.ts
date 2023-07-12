import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./constants";
import { queryClient } from "@/providers/ReactQueryProvider";
import axios from "axios";
import { Product } from "@/types";

const uploadProduct = async (data: Product) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/product`,
    data
  );
  console.log(response);
  return response.data;
};

const useUploadProduct = () => {
  return useMutation((input: Product) => uploadProduct(input), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.getAllProducts]);
    },
  });
};

export { useUploadProduct };
