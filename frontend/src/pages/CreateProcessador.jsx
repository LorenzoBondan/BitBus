import ProcessadorForm from '../forms/ProcessadorForm'
import { useCreateProcessador } from '../rest/processadorRestHooks'

const CreateProcessador = () => {
  const { createProcessador } = useCreateProcessador({
    onSuccess: { routeTo: '/acervo' },
  })

  const onSubmit = async (data) => {
    await createProcessador(data)
  }

  return (
    <ProcessadorForm
      navToOnCancel={'/acervo'}
      title={'Novo Processador'}
      onSubmit={onSubmit}
    />
  )
}

export default CreateProcessador
