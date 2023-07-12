import React, { ChangeEvent, useState } from "react";
import { RxCross1 } from "react-icons/rx";

interface ISizeProps {
  onAnalyze: (value: any) => void;
  loadingAnalyzer: boolean;
}

const Size: React.FC<ISizeProps> = (props) => {
  const [sizeValues, setSizeValues] = useState<any[]>([
    { name: "", price: 0, quantity: 0, itemCode: "" },
  ]);

  let addFormFields = () => {
    setSizeValues([
      ...sizeValues,
      { name: "", price: 0, quantity: 0, itemCode: "" },
    ]);
  };

  const handleChange = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const newFormValues: any[] = [...sizeValues];
    newFormValues[i][e.target.name as any] = e.target.value;
    setSizeValues(newFormValues);
  };

  let removeFormFields = (i: number) => {
    let newFormValues = [...sizeValues];
    newFormValues.splice(i, 1);
    setSizeValues(newFormValues);
  };

  const handleAnalyze = () => {
    const newArray = sizeValues.map((obj) => {
      return {
        ...obj,
        size: obj.name,
      };
    });
    props.onAnalyze(newArray);
  };

  return (
    <>
      <div className="mt-8">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Code</th>
                <th className="w-1">Quantity</th>
                <th className="w-1">Price</th>
                <th>Actions</th>
                <th className="w-1"></th>
              </tr>
            </thead>
            <tbody>
              {sizeValues.length <= 0 && (
                <tr>
                  <td colSpan={5} className="!text-center font-semibold">
                    No Item Available
                  </td>
                </tr>
              )}
              {sizeValues.map((element, index) => {
                const variationKey = `color_variation_${index}`;
                return (
                  <React.Fragment key={variationKey}>
                    <tr className="align-top">
                      <td>
                        <input
                          type="text"
                          className="form-input min-w-[200px]"
                          placeholder="Enter Size"
                          name="name"
                          value={element.name || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-input min-w-[200px]"
                          placeholder="Enter Item Code"
                          name="itemCode"
                          value={element.itemCode || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-input w-32"
                          name="quantity"
                          value={element.quantity || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-input w-32"
                          name="price"
                          value={element.price || ""}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => removeFormFields(index)}
                        >
                          <RxCross1 className="w-5 h-5 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-col justify-between px-4 sm:flex-row">
          <div className="mb-6 sm:mb-0">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addFormFields()}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-5">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleAnalyze}
          disabled={props.loadingAnalyzer}
        >
          {props.loadingAnalyzer ? "Analyzing..." : "Analyze Variation"}
        </button>
      </div>
    </>
  );
};

export default Size;
