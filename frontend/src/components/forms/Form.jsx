import { createContext } from 'react'
import PT from 'prop-types'
import {
  useFormContext,
  useFormState,
  useForm,
  FormProvider,
  useFormContext as UseReactHookFormContext,
} from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Panel from '../ui/Panel'
import FormTitle from './FormTitle'
import { SubmitButton } from './Form'
import NavButton from '../buttons/NavButton'

// So that everything can be imported from Form
export { default as TextInput } from './TextInput'
export { default as DateInput } from './DateInput'
export { default as TextAreaInput } from './TextAreaInput'
export { default as EmailInput } from './EmailInput'
export { default as NumberInput } from './NumberInput'
export { default as SubmitButton } from '../buttons/SubmitButton'
export { default as FieldSet } from './FieldSet'
export { default as RadioButtonsInput } from './RadioButtonsInput'
export { default as RadioButton } from './RadioButton'
export { default as PasswordInput } from './PasswordInput'
export { default as RadioFormLabel } from './RadioFormLabel'
export { default as FileInput } from './FileInput'
export { default as SelectMenuInput } from './SelectMenuInput'
export { default as CheckboxInput } from './CheckboxInput'
export { default as ImmutableInput } from './ImmutableInput'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  id: PT.string, // used to uniquiely identify fields & input elements, and as the form id
  onSubmit: PT.func,
  onError: PT.func,
  onDirtyChange: PT.func, // called everytime a form's dirty state changes
  defaultValues: PT.object, // initial values for the form
  title: PT.node, // optional, only displayed if provided
  withPanel: PT.bool, // encolose the form in a panel
  panelClassName: PT.string, // applied to panel
  debug: PT.bool,
  children: PT.any,
  className: PT.string, // applied to root container
  navToOnCancel: PT.oneOfType([PT.string, PT.oneOf([-1])]), // url used to redirect on cancel button click
  disableFormButtons: PT.bool,
  isLoading: PT.bool,
}

export const FormContext = createContext('unintilized form context')

const Form = (props) => {
  const {
    id,
    withPanel = true,
    title,
    onSubmit = () => console.log('Form onSubmit() not provided'),
    onError = (e) => console.log('Form submission error', e),
    onDirtyChange,
    className = '',
    panelClassName = '',
    children,
    debug = false,
    navToOnCancel = '/',
    disableFormButtons = false,
    isLoading = false,
  } = props

  const cn = {
    buttonsContainer: 'flex flex-row justify-end gap-4 mt-6',
  }

  const { handleSubmit, control } = UseReactHookFormContext()

  return (
    <div {...{ className }}>
      {title && <FormTitle {...{ title }} />}
      <WithPanel {...{ withPanel, panelClassName }}>
        <form onSubmit={handleSubmit(onSubmit, onError)} {...{ id }}>
          <StateMonitor {...{ onDirtyChange }} />
          {children}
          {!disableFormButtons && (
            <div className={cn.buttonsContainer}>
              <NavButton
                className="flex-initial"
                text="Cancelar"
                solid={false}
                linkto={navToOnCancel}
                disabled={isLoading}
              />
              <SubmitButton className={cn.button} disabled={isLoading} />
            </div>
          )}
        </form>
        {debug && <DevTool control={control} />}
      </WithPanel>
    </div>
  )
}

const WithPanel = ({ withPanel, panelClassName, children }) =>
  withPanel ? (
    <Panel className={panelClassName}>{children}</Panel>
  ) : (
    <div>{children}</div>
  )

WithPanel.propTypes = {
  withPanel: PT.bool,
  panelClassName: PT.string,
  children: PT.any,
}

export const nullFormContext = {
  register: () => {
    console.log('register not available, inputs must be wrapped in <Form />')
  },
  setValue: () => {
    console.log('setValue not available, inputs must be wrapped in <Form />')
  },
  control: () => {
    console.log('control not available, inputs must be wrapped in <Form />')
  },
  formState: { errors: {} },
}

const withFormContext = (FormToWrap) => (props) => {
  // eslint-disable-next-line react/prop-types
  const { defaultValues } = props
  const useFormOptions = defaultValues ? { defaultValues } : {}
  const useFormMethods = useForm(useFormOptions)
  return (
    <FormProvider {...useFormMethods}>
      <FormToWrap {...props} />
    </FormProvider>
  )
}

Form.propTypes = propTypes
export default withFormContext(Form)

//*****************************************************************************
// Helpers
//*****************************************************************************

const StateMonitor = ({ onDirtyChange }) => {
  const { control } = useFormContext()
  const { dirtyFields } = useFormState({ control })
  if (onDirtyChange) onDirtyChange(dirtyFields)
  return null
}
StateMonitor.propTypes = {
  onDirtyChange: PT.func,
}
