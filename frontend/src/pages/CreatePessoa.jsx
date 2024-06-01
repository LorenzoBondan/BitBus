import PessoaForm from '../forms/PessoaForm'
import { useCreatePessoa } from '../rest/pessoaRestHooks'

const CreatePessoa = () => {
  const { createPessoa } = useCreatePessoa({
    onSuccess: { routeTo: '/pessoas' },
  })

  const onSubmit = async (data) => {
    await createPessoa(data)
  }

  return (
    <PessoaForm
      navToOnCancel={'/pessoas'}
      title={'Nova Pessoa'}
      onSubmit={onSubmit}
    />
  )
}

export default CreatePessoa
