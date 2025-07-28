import React from "react";
import { Button, Form, message, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Typography } from "antd";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../common/Input";
import useCreateMovie from "@/queries/movies/create";
import { useQueryClient } from "@tanstack/react-query";

const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  director: z.string().min(1, "Director is required"),
  budget: z
    .string()
    .regex(/^\$[\d,]+[MK]?$/, "Invalid budget format (e.g., $160M, $3,000)"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  yearTime: z
    .string()
    .regex(/^\d{4}(-\d{4})?$/, "Invalid year format (e.g., 2010 or 2008-2013)"),
});
type MovieFormData = z.infer<typeof movieSchema>;

interface MovieDataType {
  onSubmit: (data: MovieFormData) => void;
  initialData?: MovieFormData;
  isEditing?: boolean;
  open: boolean;
  onClose: () => void;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const MovieForm: React.FC<MovieDataType> = ({
  onSubmit,
  initialData,
  isEditing = false,
  open,
  onClose,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: initialData || {
      title: "",
      type: "",
      director: "",
      budget: "",
      location: "",
      duration: "",
      yearTime: "",
    },
  });
  const { mutate: addMovie, isError, error, isPending } = useCreateMovie();
  const queryClient = useQueryClient();

  const onAddMovie = (data: MovieFormData) => {
    addMovie(data, {
      onSuccess: () => {
        message.success(
          isEditing
            ? "Movie updated successfully!"
            : "Movie created successfully!"
        );
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        onClose();
        reset();
        onSubmit(data);
      },
      onError: () => {
        message.error(
          isEditing
            ? "Failed to update movie. Please check your input."
            : "Failed to create movie. Please check your input."
        );
      },
    });
  };

  React.useEffect(() => {
    if (!open) {
      reset(
        initialData || {
          title: "",
          type: "",
          director: "",
          budget: "",
          location: "",
          duration: "",
          yearTime: "",
        }
      );
    }
  }, [open, initialData, reset]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      title={
        <Typography.Title
          level={4}
          className="!mb-0 !text-2xl !font-semibold !text-gray-800 dark:!text-gray-100"
        >
          {isEditing ? "Edit Entry" : "Add New Entry"}
        </Typography.Title>
      }
      className="!p-0"
    >
      <Form
        {...formItemLayout}
        onFinish={handleSubmit(onAddMovie)}
        className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        layout="vertical"
      >
        <InputField
          name="title"
          control={control}
          label="Title"
          required
          error={errors.title?.message}
        />
        <Form.Item
          label="Type"
          required
          validateStatus={errors.type ? "error" : ""}
          help={errors.type?.message}
        >
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: "Movie", label: "Movie" },
                  { value: "TV Show", label: "TV Show" },
                ]}
                placeholder="Select type"
              />
            )}
          />
        </Form.Item>
        <InputField
          name="director"
          control={control}
          label="Director"
          required
          error={errors.director?.message}
        />
        <InputField
          name="budget"
          control={control}
          label="Budget"
          required
          error={errors.budget?.message}
          placeholder="e.g. $160M"
        />
        <InputField
          name="location"
          control={control}
          label="Location"
          required
          error={errors.location?.message}
        />
        <InputField
          name="duration"
          control={control}
          label="Duration"
          required
          error={errors.duration?.message}
        />
        <InputField
          name="yearTime"
          control={control}
          label="Year"
          required
          error={errors.yearTime?.message}
          placeholder="e.g. 2010 or 2008-2013"
        />
        {isError && (
          <div className="text-red-500 mb-2">
            {error?.message || "Failed to save movie. Please check your input."}
          </div>
        )}
        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600 hover:bg-blue-700"
            loading={isPending}
          >
            {isEditing ? "Save" : "Submit"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default MovieForm;
