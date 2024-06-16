import DoacaoForm from '../forms/DoacaoForm'
import { useCreateDoacao } from '../rest/doacaoRestHooks'

const CreateDoacao = () => {
  const { createDoacao } = useCreateDoacao({
    onSuccess: { routeTo: '/doacoes' },
  })

  const onSubmit = async (data) => {
    await createDoacao(data)
  }

  return (
    <DoacaoForm
      navToOnCancel={'/doacoes'}
      title={'Nova Doação'}
      onSubmit={onSubmit}
    />
  )
}

export default CreateDoacao
