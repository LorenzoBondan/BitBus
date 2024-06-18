import VisitaForm from '../forms/VisitaForm'
import { useCreateVisita } from '../rest/visitaRestHooks'

const CreateVisita = () => {
  const { createVisita } = useCreateVisita({
    onSuccess: { routeTo: '/visitas' },
  })

  const onSubmit = async (data) => {
    await createVisita(data)
  }

  return (
    <VisitaForm
      navToOnCancel={'/visitas'}
      title={'Nova Visita'}
      onSubmit={onSubmit}
    />
  )
}

export default CreateVisita
