import { Input } from "antd";
import type { InputProps } from "antd";
import { Controller } from "react-hook-form";

export interface InputTypes extends InputProps {
  label?: string;
  name: string;
  control: any;
  error?: string;
  required: boolean;
  placeholder?: string;
}

const InputField = ({
  name,
  control,
  label,
  required,
  placeholder,
  error,
  ...props
}: InputTypes) => {
  return (
    <div className="flex flex-col gap-1 w-full mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          {label}{" "}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            status={error ? "error" : undefined}
            {...props}
          />
        )}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};
export default InputField;
