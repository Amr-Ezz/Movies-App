import { useMutation } from "@tanstack/react-query";
import { searchMovies } from "@/services/index"; 

export const useSearchMovies = () => {
  return useMutation({
    mutationFn: (query: string) => searchMovies(query),
  });
};
