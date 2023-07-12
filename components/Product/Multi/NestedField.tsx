import VariationInput from "@/components/Inputs/VariationInput";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

interface INestedFieldArrayProps {
  nestIndex: number;
  control: any;
  register: any;
  errors: any;
}

const NestedFieldArray: React.FC<INestedFieldArrayProps> = ({
  nestIndex,
  control,
  register,
  errors,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `values[${nestIndex}].size`,
  });
  return (
    <div>
      <div className="w-full flex justify-end">
        <button
          type="button"
          className="btn btn-dark text-xs px-3 py-1.5 mb-2"
          onClick={() => append({})}
        >
          Add Size
        </button>
      </div>

      <table>
        <tbody>
          {fields.map((item, k) => {
            return (
              <tr key={item.id}>
                <th>
                  <VariationInput
                    id={`color[${nestIndex}].size[${k}].name`}
                    label="Size Name"
                    disabled={false}
                    register={register}
                    type="number"
                    required
                    className="form-input flex-1"
                    errors={errors}
                  />
                </th>
                <th>
                  <VariationInput
                    id={`color[${nestIndex}].size[${k}].itemCode`}
                    label="Item Code"
                    disabled={false}
                    register={register}
                    type="text"
                    required
                    className="form-input flex-1"
                    errors={errors}
                  />
                </th>
                <th>
                  <VariationInput
                    id={`color[${nestIndex}].size[${k}].price`}
                    label="Price"
                    disabled={false}
                    register={register}
                    type="number"
                    required
                    className="form-input flex-1"
                    errors={errors}
                  />
                </th>
                <th>
                  <VariationInput
                    id={`color[${nestIndex}].size[${k}].stock`}
                    label="Stock"
                    disabled={false}
                    register={register}
                    type="number"
                    required
                    className="form-input flex-1"
                    errors={errors}
                  />
                </th>
                <th>
                  <div className="flex flex-row gap-2 mt-4 justify-end">
                    <button type="button" onClick={() => remove(k)}>
                      <RxCross1 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default NestedFieldArray;
