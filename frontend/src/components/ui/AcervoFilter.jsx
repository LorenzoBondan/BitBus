import PT from 'prop-types'
import { useForm } from 'react-hook-form'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Form, { SubmitButton, TextInput } from '../forms/Form'
import Button from '../buttons/Button'

const propTypes = {
  onSubmitFilter: PT.func,
  className: PT.string, // applied to root container
}

const AcervoFilter = ({ onSubmitFilter, className }) => {
  const onSubmit = (formData) => {
    console.log(formData)
    onSubmitFilter(formData.nome)
  }

  const handleFormClear = () => {
    // setValue('nome', '')
  }

  const cn = {
    form: 'max-w-lg',
    buttonContainer: 'flex w-full justify-end gap-2 flex-row',
  }

  const disableFormButtons = true

  return (
    <Form {...{ onSubmit, disableFormButtons, className }}>
      <TextInput label="Nome" name="nome" />
      <div className={cn.buttonContainer}>
        <Button onClick={handleFormClear} text="Limpar" solid={false} />
        <SubmitButton text="Buscar" icon={MagnifyingGlassIcon} />
      </div>
    </Form>
  )
}

AcervoFilter.propTypes = propTypes

export default AcervoFilter
