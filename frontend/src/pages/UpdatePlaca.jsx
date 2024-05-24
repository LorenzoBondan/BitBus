import { useParams } from 'react-router-dom'
import { useGetPlacaById, useUpdatePlaca } from '../rest/placaRestHooks'
import PlacaForm from '../forms/PlacaForm'

const UpdatePlaca = () => {
  const { id } = useParams()

  const { placa, isLoading } = useGetPlacaById(id)

  const { updatePlaca } = useUpdatePlaca(id, {
    onSuccess: { routeTo: `/acervo/placa/${id}` },
  })

  const onSubmit = async (data) => {
    await updatePlaca(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <PlacaForm
      navToOnCancel={`/acervo/placa/${id}`}
      initialPlacaData={placa}
      title={'Alterar Placa'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdatePlaca
