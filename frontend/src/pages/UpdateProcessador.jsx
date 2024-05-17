import { useParams } from 'react-router-dom'
import { useGetProcessadorById, useUpdateProcessador } from '../rest/processadorRestHooks'
import ProcessadorForm from '../forms/ProcessadorForm'

const UpdateProcessador = () => {
  const { id } = useParams()

  const { processador, isLoading } = useGetProcessadorById(id)

  const { updateProcessador } = useUpdateProcessador(id, {
    onSuccess: { routeTo: `/acervo/processador/${id}` },
  })

  const onSubmit = async (data) => {
    await updateProcessador(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <ProcessadorForm
      navToOnCancel={`/acervo/processador/${id}`}
      initialProcessadorData={processador}
      title={'Alterar Processador'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateProcessador
