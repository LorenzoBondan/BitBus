import { useParams } from 'react-router-dom'
import {
  useGetSoftwareById,
  useUpdateSoftware,
} from '../rest/softwareRestHooks'
import SoftwareForm from '../forms/SoftwareForm'

const UpdateSoftware = () => {
  const { id } = useParams()

  const { software, isLoading } = useGetSoftwareById(id)

  const { updateSoftware } = useUpdateSoftware(id, {
    onSuccess: { routeTo: `/acervo/software/${id}` },
  })

  const onSubmit = async (data) => {
    await updateSoftware(data)
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <SoftwareForm
      navToOnCancel={`/acervo/software/${id}`}
      initialSoftwareData={software}
      title={'Alterar Software'}
      onSubmit={onSubmit}
    />
  )
}

export default UpdateSoftware
