import React from "react";
import PT from "prop-types";

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  labelText: PT.string, // If labelText, will still render errorText
  className: PT.string,
};

const defaultProps = {
  className: "",

};

//*****************************************************************************
// Components
//*****************************************************************************

const RadioFormLabel = (props) => {
  console.log(props);

  return <label>{props.value}</label>;
};

RadioFormLabel.propTypes = propTypes;
RadioFormLabel.defaultProps = defaultProps;
export default RadioFormLabel;
