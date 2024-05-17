import { useParams } from 'react-router-dom'
import MemoriaForm from '../forms/MemoriaForm'
import { useGetMemoriaById, useUpdateMemoria } from '../rest/memoriaRestHooks'

const UpdateMemoria = () => {
  const { id } = useParams()

  const { memoria, isLoading } = useGetMemoriaById(id)

  const { updateMemoria } = useUpdateMemoria(id, {
    onSuccess: { routeTo: `/acervo/memoria/${id}` },
  })

  const onSubmit = async (data) => {
    await updateMemoria(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <MemoriaForm
      navToOnCancel={`/acervo/memoria/${id}`}
      initialMemoriaData={memoria}
      title={'Alterar Memória'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateMemoria
