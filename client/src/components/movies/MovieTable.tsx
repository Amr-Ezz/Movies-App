import React, { useState, useRef, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Typography,
  type TableProps,
} from "antd";
import { type MovieType } from "../common/Types";
import LoadingSpinner from "../common/LoadingSpinner";
import { useGetMovies, useEditMovie, useDeleteMovie } from "@/queries/movies";
import { useSearchMovies } from "@/queries/movies/search";

// const dummyFilms: MovieType[] = [
//   {
//     key: "1",
//     title: "Inception",
//     type: "Movie",
//     director: "Christopher Nolan",
//     budget: "$160M",
//     location: "LA, Paris",
//     duration: "148 min",
//     year: "2010",
//   },
//   {
//     key: "2",
//     title: "Breaking Bad",
//     type: "TV Show",
//     director: "Vince Gilligan",
//     budget: "$3M/ep",
//     location: "Albuquerque",
//     duration: "49 min/ep",
//     year: "2008-2013",
//   },
//   {
//     key: "3",
//     title: "The Matrix",
//     type: "Movie",
//     director: "The Wachowskis",
//     budget: "$63M",
//     location: "Cyber Space",
//     duration: "136 min",
//     year: "1999",
//   },
//   {
//     key: "4",
//     title: "Game of Thrones",
//     type: "TV Show",
//     director: "Various",
//     budget: "$10M/ep",
//     location: "Westeros",
//     duration: "60 min/ep",
//     year: "2011-2019",
//   },
//   {
//     key: "5",
//     title: "Interstellar",
//     type: "Movie",
//     director: "Christopher Nolan",
//     budget: "$165M",
//     location: "Space, Earth",
//     duration: "169 min",
//     year: "2014",
// ];

// const originData = Array.from({ length: 100 }).map<DataType>((_, i) => ({
//   key: i.toString(),
//   name: `Edward ${i}`,
//   age: 32,
//   address: `London Park no. ${i}`,
// }));

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: MovieType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const PAGE_SIZE = 3;

const MovieTable: React.FC = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // hooks for fetching data

  const { mutate: deleteMovie } = useDeleteMovie();
  const { mutate: editMovie } = useEditMovie();
  const [query, setQuery] = useState("");
  const { data: movies, refetch: refetchMovies, isLoading } = useGetMovies();
  const [isSearchMode, setIsSearchMode] = useState(false);

  /// mutation search

  const {
    mutate: searchMovies,
    data: results,
    isPending,
    isSuccess,
  } = useSearchMovies();

  

  const displayData = useMemo(() => {
    if (isSearchMode && isSuccess && results) {
      return Array.isArray(results) ? results : [];
    }
    return Array.isArray(movies) ? movies : [];
  }, [isSearchMode, isSuccess, results, movies]);

  const handleSearch = () => {
    if (!query.trim()) return message.warning("Please enter a search term");
    setIsSearchMode(true);
    searchMovies(query, {
      onSuccess: (data) => {
        message.success(`Found ${data?.length || 0} results`);
        (data as MovieType[]).forEach((movie) => {
          console.log("Search result:", movie.title);
        });
      },
      onError: (error) => {
        console.error("Search error:", error);
        message.error("Search failed. Please try again.");
        setIsSearchMode(false);
      },
    });
  };
  const handleClearSearch = () => {
    setQuery("");
    setIsSearchMode(false);
    refetchMovies();
  };
  const isMatchingSearchResult = (movie: MovieType) => {
    if (!isSearchMode || !query.trim()) return false;

    const searchTerm = query.toLowerCase();
    const fieldsToSearch = [
      movie.title,
      movie.director,
      movie.location,
      movie.type,
      movie.budget,
      movie.duration,
      movie.yearTime,
    ];

    return fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchTerm)
    );
  };
////////////////////////////////////////
  const scrollDivRef = useRef<HTMLDivElement>(null);


////// Edit Functionality
  const isEditing = (record: MovieType) => record.id === editingKey;

  const edit = (record: MovieType) => {
    form.setFieldsValue({
      title: record.title || "",
      type: record.type || "",
      director: record.director || "",
      budget: record.budget || "",
      location: record.location || "",
      duration: record.duration || "",
      yearTime: record.yearTime || "",
    });
    setEditingKey((record.id as number) || null);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const save = async (id: number) => {
    try {
      const row = await form.validateFields();
      editMovie(
        { id, ...row },
        {
          onSuccess: () => {
            setEditingKey(null);
            refetchMovies();
          },
        }
      );
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };


  //// Delete Functionality
  const handleDelete = (id: number) => {
    deleteMovie(id, {
      onSuccess: () => {
        message.success("Movie deleted successfully!");
        setEditingKey(null);
        refetchMovies();
      },
      onError: (error) => {
        console.error("Error deleting movie:", error);
      },
    });
  };


  // Defining columns for the table

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      editable: true,
    },
    {
      title: "Director",
      dataIndex: "director",
      editable: true,
    },
    {
      title: "Budget",
      dataIndex: "budget",
      editable: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      editable: true,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      editable: true,
    },
    {
      title: "Year/Time",
      dataIndex: "yearTime",
      editable: true,
      render: (text: string) => text || "-",
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: MovieType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id as number)}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== null}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
            >
              Edit
            </Typography.Link>
            /
            <Popconfirm
              title={"Are Sure You Want to Cancel"}
              onConfirm={() => handleDelete(record.id as number)}
            >
              <Typography.Link>Delete</Typography.Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const mergedColumns: TableProps<MovieType>["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: MovieType) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record), 
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <div
        ref={scrollDivRef}
        style={{ height: 400, overflow: "auto" }}
        className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800 p-4"
      >
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onPressEnter={handleSearch}
            className="w-64"
          />
          <Button
            onClick={handleSearch}
            loading={isPending}
            type="primary"
            disabled={!query.trim()}
          >
            Search
          </Button>

          {isSearchMode && (
            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              {isPending ? (
                "Searching..."
              ) : isSuccess && displayData.length > 0 ? (
                <>
                  Found {displayData.length} result(s)
                  <Button onClick={handleClearSearch} type="link" size="small">
                    Clear
                  </Button>
                </>
              ) : (
                "No results found"
              )}
            </div>
          )}
        </div>
        <Table<MovieType>
          components={{ body: { cell: EditableCell } }}
          dataSource={displayData}
          columns={mergedColumns}
          rowClassName={(record) => {
            const baseClass =
              "border-b last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-700";

            if (isSearchMode && isMatchingSearchResult(record)) {
              return `${baseClass} bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800`;
            }
            return baseClass;
          }}
          pagination={false}
          className="min-w-full divide-y divide-gray-200"
          bordered={false}
          tableLayout="fixed"
          locale={{
            emptyText: isSearchMode
              ? `No movies found matching "${query}"`
              : "No movies available",
          }}
        />
        {(loading || isLoading || isPending) && (
          <div className="flex justify-center py-4">
            <LoadingSpinner />
          </div>
        )}
        {/* {!hasMore && (
          <div className="text-center text-gray-400 py-2 text-sm">No more results</div>
        )} */}
      </div>
    </Form>
  );
};

export default MovieTable;
