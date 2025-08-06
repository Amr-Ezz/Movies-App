import type { MovieType } from "@/components/common/Types";
import ApiClient from "@lib/api";

export const fetchMovies = async () => {
  try {
    const response = await ApiClient.get(`/api/movies`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const postMovie = async (movie: MovieType) => {
  try {
    console.log("Posting movie:", movie);

    const response = await ApiClient.post(`/api/movies`, movie, {});
    return response.data;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

export const putMovie = async (id: number, movie: MovieType) => {
  try {
    const response = await ApiClient.put(`/api/movies/${id}`, movie);
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteMovie = async (id: number) => {
  try {
    const response = await ApiClient.delete(`/api/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
export const searchMovies = async (query: string) => {
  try {
    const response = await ApiClient.get(`/api/movies?search=${query}`);
    return response.data.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};
