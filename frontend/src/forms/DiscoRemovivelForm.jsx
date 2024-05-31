import PT from 'prop-types'
import Form, {
  TextInput,
  NumberInput,
  TextAreaInput,
} from '../components/forms/Form'
import LinksForm from './LinksForm'
import { omit } from 'ramda'
import { validateMaxLength, validateMinLength } from '../utils/validationUtils'
import TipoItemSelectInput from '../views/acervo/tipoItem/TipoItemSelectInput'
import CreateTipoItem from '../views/acervo/tipoItem/CreateTipoItem'

const propTypes = {
  onSubmit: PT.func, // called on form submission (passed form data)
  onDirtyChange: PT.func, // called when ever form dirty state changes
  title: PT.string, // form title if desired
  initialDiscoRemovivelData: PT.object,
  navToOnCancel: PT.string, // route to navigate if form processing is cancelled
  className: PT.string, // applied to root container
}

const DiscoRemovivelForm = (props) => {
  const {
    title = '',
    navToOnCancel = '',
    onDirtyChange,
    initialDiscoRemovivelData = {},
    onSubmit,
    className = '',
  } = props

  const cn = {
    root: `max-w-lg ${className}`,
    medidas: 'flex gap-2',
  }

  const defaultValues = initialDiscoRemovivelData

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
          name="nome"
          label="Nome"
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 50),
          }}
        />
        <NumberInput required name="ano" label="Ano" />
        <NumberInput required name="quantidade" label="Quantidade" />
        <div className={cn.medidas}>
          <NumberInput step={0.001} name="altura" label="Altura" />
          <NumberInput step={0.001} name="largura" label="Largura" />
          <NumberInput step={0.001} name="espessura" label="Espessura" />
        </div>
        <TextInput
          required
          name="imgUrl"
          label="Imagem (URL)"
          validate={{
            min: (text) => validateMinLength(text, 8),
          }}
        />
        <TipoItemSelectInput />
        <TextAreaInput
          name="informacoes"
          label="Informações adicionais"
          validate={{
            min: (text) => validateMinLength(text, 3),
            max: (text) => validateMaxLength(text, 255),
          }}
          rows={3}
          required
        />
        <LinksForm />
      </Form>
      <CreateTipoItem />
    </div>
  )
}

DiscoRemovivelForm.propTypes = propTypes

export default DiscoRemovivelForm
