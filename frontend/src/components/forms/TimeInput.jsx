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

const TimeInput = (props) => {
  return (
    <FormInput
      {...{
        type: "time",
        defaultValue: props.defaultValue,
        ...pickFormProps(props),
        className: "text-red",
      }}
    />
  );
};

TimeInput.propTypes = propTypes;
TimeInput.defaultProps = defaultProps;

export default TimeInput;
