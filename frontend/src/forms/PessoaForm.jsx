import PT from 'prop-types'
import Form, { TextInput } from '../components/forms/Form'
import {
  validateInputEmail,
  validateMaxLength,
  validateMinLength,
} from '../utils/validationUtils'
import PapelSelectInput from '../views/pessoa/papel/PapelSelectInput'
import CreatePapel from '../views/pessoa/papel/CreatePapel'

const propTypes = {
  onSubmit: PT.func, // called on form submission (passed form data)
  onDirtyChange: PT.func, // called when ever form dirty state changes
  title: PT.string, // form title if desired
  initialPessoaData: PT.object,
  navToOnCancel: PT.string, // route to navigate if form processing is cancelled
  className: PT.string, // applied to root container
}

const PessoaForm = (props) => {
  const {
    title = '',
    navToOnCancel = '',
    onDirtyChange,
    initialPessoaData = {},
    onSubmit,
    className = '',
  } = props

  const cn = {
    root: `max-w-lg ${className}`,
    medidas: 'flex gap-2',
  }

  const defaultValues = initialPessoaData

  const handleOnSubmit = (data) => {
    onSubmit(data)
  }

  return (
    <div className={cn.root}>
      <Form
        className={cn.form}
        {...{
          title,
          onDirtyChange,
          onSubmit: handleOnSubmit,
          navToOnCancel,
          defaultValues,
        }}
      >
        <TextInput
          required
          name="nome"
          label="Nome"
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 50),
          }}
        />
        <TextInput
          required
          name="email"
          label="Email"
          validate={{
            validEmail: validateInputEmail,
          }}
        />
        <TextInput name="curriculo" label="Currículo" />
        <PapelSelectInput />
      </Form>
      <CreatePapel />
    </div>
  )
}

PessoaForm.propTypes = propTypes

export default PessoaForm
