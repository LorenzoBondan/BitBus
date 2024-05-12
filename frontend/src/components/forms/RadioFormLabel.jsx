import PT from 'prop-types'

const propTypes = {
  value: PT.string,
}

const RadioFormLabel = (props) => {
  return <label>{props.value}</label>
}

RadioFormLabel.propTypes = propTypes
export default RadioFormLabel
