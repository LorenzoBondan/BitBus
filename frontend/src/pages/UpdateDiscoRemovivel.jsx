import { useParams } from 'react-router-dom'
import {
  useGetDiscoRemovivelById,
  useUpdateDiscoRemovivel,
} from '../rest/discoRemovivelRestHooks'
import DiscoRemovivelForm from '../forms/DiscoRemovivelForm'

const UpdateDiscoRemovivel = () => {
  const { id } = useParams()

  const { discoRemovivel, isLoading } = useGetDiscoRemovivelById(id)

  const { updateDiscoRemovivel } = useUpdateDiscoRemovivel(id, {
    onSuccess: { routeTo: `/acervo/disco_removivel/${id}` },
  })

  const onSubmit = async (data) => {
    await updateDiscoRemovivel(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <DiscoRemovivelForm
      navToOnCancel={`/acervo/disco_removivel/${id}`}
      initialDiscoRemovivelData={discoRemovivel}
      title={'Alterar Disco Removível'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateDiscoRemovivel
