import { useParams } from 'react-router-dom'
import PessoaForm from '../forms/PessoaForm'
import { useGetPessoaById, useUpdatePessoa } from '../rest/pessoaRestHooks'

const UpdatePessoa = () => {
  const { id } = useParams()

  const { pessoa, isLoading } = useGetPessoaById(id)

  const { updatePessoa } = useUpdatePessoa(id, {
    onSuccess: { routeTo: `/pessoas/${id}` },
  })

  const onSubmit = async (data) => {
    await updatePessoa(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <PessoaForm
      navToOnCancel={`/pessoas/${id}`}
      initialPessoaData={pessoa}
      title={'Alterar Pessoa'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdatePessoa
