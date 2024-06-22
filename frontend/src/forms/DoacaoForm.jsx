import PT from 'prop-types'
import Form, { TextInput, NumberInput } from '../components/forms/Form'
import { omit } from 'ramda'
import { validateMaxLength, validateMinLength } from '../utils/validationUtils'
import PessoaSelectInput from '../views/pessoa/PessoaSelectInput'
import ItemAcervoSelectInput from '../views/acervo/ItemAcervoSelectInput'
import CreateItemAcervo from '../views/acervo/CreateItemAcervo'

const propTypes = {
  onSubmit: PT.func, // called on form submission (passed form data)
  onDirtyChange: PT.func, // called when ever form dirty state changes
  title: PT.string, // form title if desired
  initialDoacaoData: PT.object,
  navToOnCancel: PT.string, // route to navigate if form processing is cancelled
  className: PT.string, // applied to root container
}

const DoacaoForm = (props) => {
  const {
    title = '',
    navToOnCancel = '',
    onDirtyChange,
    initialDoacaoData = {},
    onSubmit,
    className = '',
  } = props

  const cn = {
    root: `max-w-lg ${className}`,
    medidas: 'flex gap-2',
  }

  const defaultValues = initialDoacaoData

  const handleOnSubmit = (data) => {
    const filteredData = omit(['temp_link'], data)
    onSubmit(filteredData)
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
          name="descricao"
          label="Descrição"
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 50),
          }}
        />
        <PessoaSelectInput required name="doador" label="Doador" />
        <ItemAcervoSelectInput name="itens" label="Itens" isMulti required />
        <NumberInput step={0.01} name="valor" label="Valor (R$)" />
      </Form>
      <CreateItemAcervo />
    </div>
  )
}

DoacaoForm.propTypes = propTypes

export default DoacaoForm
