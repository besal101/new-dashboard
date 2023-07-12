import React, { FocusEvent } from "react";
import ReactQuill, { ReactQuillProps } from "react-quill";

interface ReactQuillWrapperProps extends ReactQuillProps {
  name: string;
}

const ReactQuillWrapper = React.forwardRef<ReactQuill, ReactQuillWrapperProps>(
  (props, ref) => {
    const { onChange, onBlur, name, ...rest } = props;

    const handleChange = (
      content: string,
      delta: any,
      source: string,
      editor: any
    ) => {
      onChange && onChange(content);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(event);
    };

    return (
      <ReactQuill
        {...rest}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={ref}
      />
    );
  }
);

export default ReactQuillWrapper;
