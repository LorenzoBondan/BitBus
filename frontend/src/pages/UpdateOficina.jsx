import { useParams } from 'react-router-dom'
import OficinaForm from '../forms/OficinaForm'
import { useGetOficinaById, useUpdateOficina } from '../rest/oficinaRestHooks'

const UpdateOficina = () => {
  const { id } = useParams()

  const { oficina, isLoading } = useGetOficinaById(id)

  const { updateOficina } = useUpdateOficina(id, {
    onSuccess: { routeTo: `/oficinas/${id}` },
  })

  const onSubmit = async (data) => {
    await updateOficina(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <OficinaForm
      navToOnCancel={`/oficinas/${id}`}
      initialOficinaData={oficina}
      title={'Alterar Oficina'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateOficina
