import MemoriaForm from '../forms/MemoriaForm'
import { useCreateMemoria } from '../rest/memoriaRestHooks'

const CreateMemoria = () => {
  const { createMemoria } = useCreateMemoria({
    onSuccess: { routeTo: '/acervo' },
  })

  const onSubmit = async (data) => {
    await createMemoria(data)
  }

  return (
    <MemoriaForm
      navToOnCancel={'/acervo'}
      title={'Nova Memória'}
      onSubmit={onSubmit}
    />
  )
}

export default CreateMemoria
