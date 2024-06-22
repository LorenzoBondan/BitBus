import PT from 'prop-types'
import Form, { TextAreaInput, TextInput } from '../components/forms/Form'
import AutorSelectInput from '../views/visita/feedback/AutorSelectInput'
import { validateMaxLength, validateMinLength } from '../utils/validationUtils'

const propTypes = {
  onSubmit: PT.func, // called on form submission (passed form data)
  onDirtyChange: PT.func, // called when ever form dirty state changes
  title: PT.string, // form title if desired
  initialFeedbackData: PT.object,
  navToOnCancel: PT.string, // route to navigate if form processing is cancelled
  className: PT.string, // applied to root container
  buttonContainer: PT.node,
}

const FeedbackForm = (props) => {
  const {
    title = '',
    navToOnCancel = '',
    onDirtyChange,
    initialFeedbackData = {},
    onSubmit,
    className = '',
    buttonContainer,
  } = props

  const cn = {
    root: `max-w-lg ${className}`,
    medidas: 'flex gap-2',
  }

  const defaultValues = initialFeedbackData

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
        <AutorSelectInput required name="autorId" label="Autor" />
        <TextAreaInput
          required
          name="comentario"
          label="Comentário"
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 100),
          }}
        />
        <TextInput name="imgUrl" label="Imagem (URL)" />
        {buttonContainer}
      </Form>
    </div>
  )
}

FeedbackForm.propTypes = propTypes

export default FeedbackForm
