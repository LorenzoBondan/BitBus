import React from "react";
import FormInput, {
  formInputPropTypes,
  formInputDefaultProps,
  pickFormProps,
} from "./FormInput";

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = formInputPropTypes;
const defaultProps = formInputDefaultProps;

//*****************************************************************************
// Components
//*****************************************************************************

const RadioButton = (props) => {
  return (
    <FormInput
      {...{
        type: "radio",
        id: props.id,
        onChange: props.changed,
        ...pickFormProps(props),
      }}
    />
  );
};

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;
