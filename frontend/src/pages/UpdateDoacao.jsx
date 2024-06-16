import { useParams } from 'react-router-dom'
import DoacaoForm from '../forms/DoacaoForm'
import { useGetDoacaoById, useUpdateDoacao } from '../rest/doacaoRestHooks'

const UpdateDoacao = () => {
  const { id } = useParams()

  const { doacao, isLoading } = useGetDoacaoById(id)

  const { updateDoacao } = useUpdateDoacao(id, {
    onSuccess: { routeTo: `/doacoes/${id}` },
  })

  const onSubmit = async (data) => {
    await updateDoacao(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <DoacaoForm
      navToOnCancel={`/doacoes/${id}`}
      initialDoacaoData={doacao}
      title={'Alterar Doação'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateDoacao
