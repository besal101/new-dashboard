import * as React from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

interface IMultipleInputProps {
  handleKeywordsSubmit: (value: any) => void;
  placeholder?: string;
}

const MultipleInput: React.FC<IMultipleInputProps> = ({
  handleKeywordsSubmit,
  placeholder,
}) => {
  const [tags, setTags] = React.useState([]);

  const handleTagChange = (tags: any) => {
    setTags(tags);
    handleKeywordsSubmit(tags);
  };

  return (
    <>
      <TagsInput
        value={tags}
        focusedClassName="focus:border-primary"
        inputProps={{
          placeholder: placeholder,
          className:
            "w-full rounded-md border border-white-light bg-white px-4 py-2",
        }}
        onChange={handleTagChange}
        className="w-full rounded-md border border-white-light bg-white text-sm font-semibold text-black"
      />
    </>
  );
};

export default MultipleInput;
