import React from "react";
import Select from "react-select";
import { Control, useController, FieldValues } from "react-hook-form";

interface CustomSelectProps {
  control: Control<FieldValues>;
  name: string;
  options: { value: number; label: string }[];
  defaultValue?: number;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  control,
  name,
  options,
  defaultValue,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || "",
  });

  return (
    <div>
      <Select
        name={name} // Add the name prop to the Select component
        ref={ref} // Pass the ref to the Select component
        options={options}
        onChange={(selectedOption) => onChange(selectedOption?.value)}
        onBlur={onBlur}
        value={options.find((option) => option.value === value)}
        isClearable={true}
      />
      {error && <span className="text-red-500">This field is required</span>}
    </div>
  );
};

export default CustomSelect;
