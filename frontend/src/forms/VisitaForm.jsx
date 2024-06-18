import PT from 'prop-types'
import Form, { TextInput } from '../components/forms/Form'
import {
  validateDateAfter,
  validateMaxLength,
  validateMinLength,
} from '../utils/validationUtils'
import ResponsavelSelectInput from '../views/visita/ResponsavelSelectInput'
import VisitantesSelectInput from '../views/visita/VisitantesSelectInput'
import DateTimeInput from '../components/forms/DateTimeInput'

const propTypes = {
  onSubmit: PT.func, // called on form submission (passed form data)
  onDirtyChange: PT.func, // called when ever form dirty state changes
  title: PT.string, // form title if desired
  initialVisitaData: PT.object,
  navToOnCancel: PT.string, // route to navigate if form processing is cancelled
  className: PT.string, // applied to root container
  buttonContainer: PT.node,
}

const VisitaForm = (props) => {
  const {
    title = '',
    navToOnCancel = '',
    onDirtyChange,
    initialVisitaData = {},
    onSubmit,
    className = '',
    buttonContainer,
  } = props

  const cn = {
    root: `max-w-lg ${className}`,
    medidas: 'flex gap-2',
  }

  const defaultValues = initialVisitaData

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
            max: (text) => validateMaxLength(text, 50),
          }}
        />
        <DateTimeInput
          required
          name="dataInicio"
          label="Data Início"
          validate={{
            afterNow: (d1) =>
              validateDateAfter(
                d1,
                new Date(),
                'A data deve ser posterior a este momento'
              ),
            beforeEnd: (d1, data) =>
              validateDateAfter(
                data.dataFim,
                d1,
                'A data deve ser anterior à data de fim'
              ),
          }}
        />
        <DateTimeInput
          required
          name="dataFim"
          label="Data Fim"
          validate={{
            afterNow: (d1) =>
              validateDateAfter(
                d1,
                new Date(),
                'A data deve ser posterior a este momento'
              ),
            afterStart: (d1, data) =>
              validateDateAfter(
                d1,
                data.dataInicio,
                'A data deve ser posterior à data de início'
              ),
          }}
        />
        <ResponsavelSelectInput
          required
          name="responsavel"
          label="Responsável"
        />
        <VisitantesSelectInput
          required
          name="visitantesIds"
          label="Visitantes"
        />
        {buttonContainer}
      </Form>
    </div>
  )
}

VisitaForm.propTypes = propTypes

export default VisitaForm
