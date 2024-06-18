import { useParams } from 'react-router-dom'
import VisitaForm from '../forms/VisitaForm'
import { useGetVisitaById, useUpdateVisita } from '../rest/visitaRestHooks'

const UpdateVisita = () => {
  const { idVisita } = useParams()

  const { visita, isLoading } = useGetVisitaById(idVisita)

  const { updateVisita } = useUpdateVisita(idVisita, {
    onSuccess: { routeTo: `/visitas/${idVisita}` },
  })

  const onSubmit = async (data) => {
    await updateVisita(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <VisitaForm
      navToOnCancel={`/visitas/${idVisita}`}
      initialVisitaData={visita}
      title={'Alterar Visita'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateVisita
