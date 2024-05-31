import PT from 'prop-types'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Form, { SubmitButton, TextInput } from '../forms/Form'

const propTypes = {
  onSubmitFilter: PT.func,
  className: PT.string, // applied to root container
}

const AcervoFilter = ({ onSubmitFilter, className }) => {
  const onSubmit = (formData) => {
    onSubmitFilter(formData.nome)
  }

  const cn = {
    form: 'flex gap-4 items-center justify-between',
    input: 'w-full',
    button: 'mt-1',
  }

  const disableFormButtons = true
  const title = 'Filtrar por'

  return (
    <Form {...{ onSubmit, disableFormButtons, className, title }}>
      <div className={cn.form}>
        <div className={cn.input}>
          <TextInput label="Nome" name="nome" />
        </div>
        <SubmitButton
          text="Buscar"
          icon={MagnifyingGlassIcon}
          className={cn.button}
        />
      </div>
    </Form>
  )
}

AcervoFilter.propTypes = propTypes

export default AcervoFilter
