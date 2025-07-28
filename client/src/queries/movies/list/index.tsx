import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "@/services";

const useGetMovies = () => {
  const result = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMovies(),
  });

  return result;
};

export default useGetMovies;

