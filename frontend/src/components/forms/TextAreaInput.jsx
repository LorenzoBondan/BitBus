import React from "react";
import PT from "prop-types";
import FormInput, {
  formInputPropTypes,
  formInputDefaultProps,
  pickFormProps,
} from "./FormInput";

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  ...formInputPropTypes,
  rows: PT.number,
};

const defaultProps = {
  ...formInputDefaultProps,
  rows: 3,
  placeholder: "Enter text here",
};

//*****************************************************************************
// Components
//*****************************************************************************

const TextAreaInput = (props) => {
  const { rows } = props
  const textAreaInputProps = {
    type: "textarea",
    textAreaProps: { rows },
    ...pickFormProps(props),
  };
  return <FormInput {...textAreaInputProps} />;
};

TextAreaInput.propTypes = propTypes;
TextAreaInput.defaultProps = defaultProps;
export default TextAreaInput;

