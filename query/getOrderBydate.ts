import { useQuery } from "@tanstack/react-query";

async function FetchOrderByDate() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/bydate`
  );
  return response.json();
}

const useFetchOrderByDateQuery = () => {
  return useQuery(["FetchOrderByDate"], FetchOrderByDate);
};

export { useFetchOrderByDateQuery };
