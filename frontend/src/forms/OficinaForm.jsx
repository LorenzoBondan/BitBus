import PT from 'prop-types'
import Form, {
  NumberInput,
  TextAreaInput,
  TextInput,
} from '../components/forms/Form'
import {
  validateDateAfter,
  validateMaxLength,
  validateMinLength,
} from '../utils/validationUtils'
import DateTimeInput from '../components/forms/DateTimeInput'
import PalestranteSelectInput from '../views/oficina/PalestranteSelectInput'

const propTypes = {
  onSubmit: PT.func, // called on form submission (passed form data)
  onDirtyChange: PT.func, // called when ever form dirty state changes
  title: PT.string, // form title if desired
  initialOficinaData: PT.object,
  navToOnCancel: PT.string, // route to navigate if form processing is cancelled
  className: PT.string, // applied to root container
  buttonContainer: PT.node,
}

const OficinaForm = (props) => {
  const {
    title = '',
    navToOnCancel = '',
    onDirtyChange,
    initialOficinaData = {},
    onSubmit,
    className = '',
    buttonContainer,
  } = props

  const cn = {
    root: `max-w-lg ${className}`,
    medidas: 'flex gap-2',
  }

  const defaultValues = initialOficinaData

  return (
    <div className={cn.root}>
      <Form
        className={cn.form}
        {...{
          title,
          onDirtyChange,
          onSubmit,
          navToOnCancel,
          defaultValues,
          disableFormButtons: !!buttonContainer,
        }}
      >
        <TextInput
          required
          name="local"
          label="Local"
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 40),
          }}
        />
        <DateTimeInput
          required
          name="horario"
          label="Início"
          validate={{
            afterNow: (d1) =>
              validateDateAfter(
                d1,
                new Date(),
                'A data deve ser posterior a este momento'
              ),
          }}
        />
        <NumberInput
          required
          name="duracao"
          label="Duração (min)"
          validate={{
            positive: (d1) => (d1 > 0 ? true : 'A duração deve ser positiva'),
          }}
        />
        <TextInput
          required
          name="titulo"
          label="Título"
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 50),
          }}
        />
        <TextAreaInput
          name="resumo"
          label="Resumo"
          required
          rows={3}
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 255),
          }}
        />
        <PalestranteSelectInput
          required
          name="palestrante"
          label="Palestrante"
        />
        {buttonContainer}
      </Form>
    </div>
  )
}

OficinaForm.propTypes = propTypes

export default OficinaForm
