import { TextField } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

const InputField = (props) => {
  const [field, meta] = useField(props);
  const { label } = props;
  return (
    <TextField
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default InputField;
