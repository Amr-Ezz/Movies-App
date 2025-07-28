import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiClient from "@/lib/api";

export default function useEditMovie() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (movie: any) => {
      const res = await ApiClient.put(`/movies/${movie.id}`, movie);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });
}
