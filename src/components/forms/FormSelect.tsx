import { get } from "react-hook-form";
import type {
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

import { Label } from "@/components/ui/label";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export function FormSelect<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = "Selecione...",
  disabled = false,
}: FormSelectProps<T>) {
  const error = get(form.formState.errors, name);

  return (
    <div className="space-y-2">
      <Label htmlFor={String(name)}>
        {label}
      </Label>

      <select
        id={String(name)}
        disabled={disabled}
        {...form.register(name)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}