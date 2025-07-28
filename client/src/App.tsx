import "./App.css";
import { useState } from "react";
import MovieForm from "./components/movies/MovieForm";
import MovieTable from "./components/movies/MovieTable";
import Header from "./components/layout/Header";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = new QueryClient();

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setShowModal(false);
    setLoading(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
          Movie Manager
        </h1>

        <div className="mb-10">
          <MovieTable />
        </div>
        <div>
          <MovieForm
            open={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleFormSubmit}
          />
        </div>
        <button className="button add" onClick={() => setShowModal(true)}>
          Add Movie
        </button>

        {loading && (
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
