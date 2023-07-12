import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

export interface WeightsType {
  title: string;
  description: string;
}

interface WeightsFormProps {
  onWeightssChange: (Weightss: WeightsType[]) => void;
}

const WeightsForm: React.FunctionComponent<WeightsFormProps> = ({
  onWeightssChange,
}) => {
  const [Weightss, setWeightss] = useState<WeightsType[]>([]);

  const handleWeightsChange = (
    index: number,
    fieldName: keyof WeightsType,
    value: string
  ) => {
    const updatedWeightss = [...Weightss];
    updatedWeightss[index][fieldName] = value;
    setWeightss(updatedWeightss);
  };

  const handleAddWeights = () => {
    setWeightss([...Weightss, { title: "", description: "" }]);
  };

  const handleRemoveWeights = (index: number) => {
    const updatedWeightss = [...Weightss];
    updatedWeightss.splice(index, 1);
    setWeightss(updatedWeightss);
  };

  const handleSaveWeightss = () => {
    onWeightssChange(Weightss);
  };

  return (
    <div className="">
      {/* Render the dynamic input fields */}
      {Weightss.map((Weights, index) => (
        <div key={index} className="flex mt-4">
          <div className="flex flex-row gap-2 mt-2 flex-1">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="form-input flex-1 text-xs"
              value={Weights.title}
              onChange={(event) =>
                handleWeightsChange(index, "title", event.target.value)
              }
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="form-input flex-1 text-xs"
              value={Weights.description}
              onChange={(event) =>
                handleWeightsChange(index, "description", event.target.value)
              }
            />
          </div>

          <button type="button" onClick={() => handleRemoveWeights(index)}>
            <RxCross2 size="16" className="text-red-500" />
          </button>
        </div>
      ))}
      <div className="flex flex-row gap-2 mt-4 justify-end">
        <button
          type="button"
          onClick={handleAddWeights}
          className="btn btn-primary text-xs px-3 py-1.5"
        >
          Add
        </button>
        <button
          type="button"
          onClick={handleSaveWeightss}
          className="btn btn-secondary text-xs px-3 py-1.5"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default WeightsForm;
