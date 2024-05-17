import { useParams } from 'react-router-dom'
import { useGetPerifericoById, useUpdatePeriferico } from '../rest/perifericoRestHooks'
import PerifericoForm from '../forms/PerifericoForm'

const UpdatePeriferico = () => {
  const { id } = useParams()

  const { periferico, isLoading } = useGetPerifericoById(id)

  const { updatePeriferico } = useUpdatePeriferico(id, {
    onSuccess: { routeTo: `/acervo/periferico/${id}` },
  })

  const onSubmit = async (data) => {
    await updatePeriferico(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <PerifericoForm
      navToOnCancel={`/acervo/periferico/${id}`}
      initialPerifericoData={periferico}
      title={'Alterar Periférico'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdatePeriferico
