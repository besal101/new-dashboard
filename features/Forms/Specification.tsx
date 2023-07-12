import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export interface SpecificationType {
  title: string;
  description: string;
}

interface SpecificationFormProps {
  onSpecificationsChange: (specifications: SpecificationType[]) => void;
}

const SpecificationForm: React.FunctionComponent<SpecificationFormProps> = ({
  onSpecificationsChange,
}) => {
  const [specifications, setSpecifications] = useState<SpecificationType[]>([]);

  const handleSpecificationChange = (
    index: number,
    fieldName: keyof SpecificationType,
    value: string
  ) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][fieldName] = value;
    setSpecifications(updatedSpecifications);
  };

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { title: "", description: "" }]);
  };

  const handleRemoveSpecification = (index: number) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications.splice(index, 1);
    setSpecifications(updatedSpecifications);
  };

  const handleSaveSpecifications = () => {
    onSpecificationsChange(specifications);
  };

  return (
    <div className="">
      {/* Render the dynamic input fields */}
      {specifications.map((specification, index) => (
        <div key={index} className="flex mt-4">
          <div className="flex flex-row gap-2 mt-2 flex-1">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-input flex-1 text-xs"
              value={specification.title}
              onChange={(event) =>
                handleSpecificationChange(index, "title", event.target.value)
              }
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="form-input flex-1 text-xs"
              value={specification.description}
              onChange={(event) =>
                handleSpecificationChange(
                  index,
                  "description",
                  event.target.value
                )
              }
            />
          </div>

          <button
            type="button"
            onClick={() => handleRemoveSpecification(index)}
          >
            <RxCross2 size="16" className="text-red-500" />
          </button>
        </div>
      ))}
      <div className="flex flex-row gap-2 mt-4 justify-end">
        <button
          type="button"
          onClick={handleAddSpecification}
          className="btn btn-primary text-xs px-3 py-1.5"
        >
          Add
        </button>
        <button
          type="button"
          onClick={handleSaveSpecifications}
          className="btn btn-secondary text-xs px-3 py-1.5"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SpecificationForm;
