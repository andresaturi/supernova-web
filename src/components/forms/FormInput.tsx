import { get } from "react-hook-form";
import type {
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}

export function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
}: FormInputProps<T>) {
  const error = get(form.formState.errors, name);

  return (
    <div className="space-y-2">
      <Label htmlFor={String(name)}>
        {label}
      </Label>

      <Input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...form.register(name)}
      />

      {error && (
        <p className="text-sm text-red-500">
          {String(error.message)}
        </p>
      )}
    </div>
  );
}