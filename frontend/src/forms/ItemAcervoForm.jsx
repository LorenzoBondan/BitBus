import PT from 'prop-types'
import Form, { TextInput, PasswordInput } from '../components/forms/Form'
import {
  validateInputEmail,
  validateInputPassword,
} from '../utils/validationUtils'

const propTypes = {
  onSubmit: PT.func, // called on form submission (passed form data)
  onDirtyChange: PT.func, // called when ever form dirty state changes
  title: PT.string, // form title if desired
  navToOnCancel: PT.string, // route to navigate if form processing is cancelled
  className: PT.string, // applied to root container
}

const ItemAcervoForm = (props) => {
  const {
    title = '',
    navToOnCancel = '',
    onDirtyChange,
    onSubmit,
    className = '',
  } = props

  const cn = {
    root: `max-w-lg ${className}`,
  }

  return (
    <div className={cn.root}>
      <Form
        className={cn.form}
        {...{ title, onDirtyChange, onSubmit, navToOnCancel }}
      >
        <TextInput
          required
          name="name"
          label="Application Developer Organization Name"
        />
        <TextInput
          required
          name="adminUserEmail"
          label="Admin User Email"
          validate={{
            isValidEmail: validateInputEmail,
          }}
        />
        <TextInput
          required
          name="adminUserFirstName"
          label="Admin User First Name"
        />
        <TextInput
          required
          name="adminUserLastName"
          label="Admin User Last Name"
        />
        <PasswordInput
          required
          name="adminUserPassword"
          label="Admin User Password"
          validate={{
            isValidPassword: validateInputPassword,
          }}
        />
      </Form>
    </div>
  )
}

ItemAcervoForm.propTypes = propTypes

export default ItemAcervoForm
