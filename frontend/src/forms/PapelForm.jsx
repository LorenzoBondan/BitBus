import PT from 'prop-types'
import Form, { TextInput, nullFormContext } from '../components/forms/Form'
import { validateMaxLength, validateMinLength } from '../utils/validationUtils'
import Button from '../components/buttons/Button'
import { useFormContext } from 'react-hook-form'

const propTypes = {
  onSubmit: PT.func, // called on form submission (passed form data)
  onDirtyChange: PT.func, // called when ever form dirty state changes
  title: PT.string, // form title if desired
  initialPapelData: PT.object,
  onCancel: PT.func,
  className: PT.string, // applied to root container
}

const PapelForm = (props) => {
  const {
    title = '',
    onDirtyChange,
    initialPapelData = {},
    onSubmit,
    className = '',
  } = props

  const cn = {
    root: `max-w-lg ${className}`,
    medidas: 'flex gap-2',
  }

  const defaultValues = initialPapelData

  return (
    <div className={cn.root}>
      <Form
        className={cn.form}
        disableFormButtons
        {...{
          title,
          onDirtyChange,
          onSubmit,
          defaultValues,
        }}
      >
        <TextInput
          required
          name="descricao"
          label="Descrição"
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 50),
          }}
        />
        <Actions {...props} />
      </Form>
    </div>
  )
}

PapelForm.propTypes = propTypes

export default PapelForm

const Actions = ({ onCancel, onSubmit }) => {
  const { getValues, trigger, reset } = useFormContext() || nullFormContext

  const cn = {
    buttonContainer: 'flex gap-2',
  }

  const handleSubmit = async () => {
    const result = await trigger(['descricao'])
    if (result) {
      onSubmit(getValues())
      reset()
    }
  }

  return (
    <div className={cn.buttonContainer}>
      <Button solid={false} text="Cancelar" onClick={onCancel} />
      <Button text="Enviar" onClick={handleSubmit} />
    </div>
  )
}

Actions.propTypes = propTypes
