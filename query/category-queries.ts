import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./constants";
import { CategoryOptionType, Category } from "../types";
import { queryClient } from "@/providers/ReactQueryProvider";

const FetchAllCategories = async (options: CategoryOptionType) => {
  const { limit, page } = options;
  let url = `${process.env.NEXT_PUBLIC_API_URL}/category?`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  if (page) {
    url += `&page=${page}`;
  }
  const response = await fetch(url);
  return response.json();
};

const removeCategory = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/?id=${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

const activateCategory = async (id: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/?id=${id}`,
      {
        method: "PUT",
      }
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

const useDeactiveCategory = () => {
  return useMutation<{ success: boolean; message: string }, unknown, number>(
    (id: number) => removeCategory(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.getCategory]);
      },
    }
  );
};

const useFetchAllCategory = (options: CategoryOptionType) => {
  return useQuery<
    { categories: Category[]; totalPages: number; status: boolean },
    Error
  >({
    queryKey: [queryKeys.getCategory, options],
    queryFn: () => FetchAllCategories(options),
  });
};

const useActivateCategory = () => {
  return useMutation<{ success: boolean; message: string }, unknown, number>(
    (id: number) => activateCategory(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.getCategory]);
      },
    }
  );
};

const useGetSingleCategory = (id: number) => {
  return useQuery<{ category: Category }, Error>({
    queryKey: [queryKeys.getSingleCategory, id],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`).then((res) =>
        res.json()
      ),
  });
};

export {
  useFetchAllCategory,
  useDeactiveCategory,
  useActivateCategory,
  useGetSingleCategory,
};
