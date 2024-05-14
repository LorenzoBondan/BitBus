import PT from 'prop-types'
import Form, {
  TextInput,
  NumberInput,
  TextAreaInput,
} from '../components/forms/Form'

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
    medidas: 'flex gap-2',
  }

  return (
    <div className={cn.root}>
      <Form
        className={cn.form}
        {...{ title, onDirtyChange, onSubmit, navToOnCancel }}
      >
        <TextInput required name="nome" label="Nome" />
        <NumberInput required name="ano" label="Ano" />
        <NumberInput required name="quantidade" label="Quantidade" />
        <div className={cn.medidas}>
          <NumberInput name="altura" label="Altura" />
          <NumberInput name="largura" label="Largura" />
          <NumberInput name="espessura" label="Espessura" />
        </div>
        <TextAreaInput
          name="informacoes"
          label="Informações adicionais"
          rows={3}
          required
        />
        {/* Faltando os Links */}
      </Form>
    </div>
  )
}

ItemAcervoForm.propTypes = propTypes

export default ItemAcervoForm
