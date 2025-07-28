import { deleteMovie } from "@/services";
import { useMutation } from "@tanstack/react-query";

const useDeleteMovie = () => {
    return useMutation({
        mutationFn: deleteMovie,
    });
};

export default useDeleteMovie;