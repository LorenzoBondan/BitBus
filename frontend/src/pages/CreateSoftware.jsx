import SoftwareForm from '../forms/SoftwareForm'
import { useCreateSoftware } from '../rest/softwareRestHooks'

const CreateSoftware = () => {
  const { createSoftware } = useCreateSoftware({
    onSuccess: { routeTo: '/acervo' },
  })

  const onSubmit = async (data) => {
    await createSoftware(data)
  }

  return (
    <SoftwareForm
      navToOnCancel={'/acervo'}
      title={'Novo Software'}
      onSubmit={onSubmit}
    />
  )
}

export default CreateSoftware
