import { postMovie } from "@/services";
import { useMutation } from "@tanstack/react-query";

const useCreateMovie = () => {
    return useMutation({
        mutationFn: postMovie,
    });
};

export default useCreateMovie;