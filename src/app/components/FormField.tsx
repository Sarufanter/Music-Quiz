import { cn } from "@/lib/utils";
import { FieldErrors, Path, UseFormRegister, FieldValues } from "react-hook-form";


interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassNames?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassNames,
  register,
  errors,
}: FormFieldProps<T>) => {

    const message = errors[id] && errors[id]?.message as string
  return (
    <div>
        {label && <span className="text-red-500">{label}</span>}
      <input
        id={id}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        {...register(id as Path<T>)}
        className={cn("w-full border px-4 py-2 rounded",errors[id] && 'border-rose-400' , inputClassNames)}
      />
      {message && <span className="text-red-500">{message}</span>}
    </div>
  );
};
export default FormField;
