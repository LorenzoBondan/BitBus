import MemoriaForm from '../forms/MemoriaForm'
import { useCreateMemoria } from '../rest/memoriaRestHooks'

const CreateMemoria = () => {
  const { createMemoria } = useCreateMemoria()

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
