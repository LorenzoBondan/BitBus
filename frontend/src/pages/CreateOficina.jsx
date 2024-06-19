import OficinaForm from '../forms/OficinaForm'
import { useCreateOficina } from '../rest/oficinaRestHooks'

const CreateOficina = () => {
  const { createOficina } = useCreateOficina({
    onSuccess: { routeTo: '/oficinas' },
  })

  const onSubmit = async (data) => {
    await createOficina(data)
  }

  return (
    <OficinaForm
      navToOnCancel={'/oficinas'}
      title={'Nova Oficina'}
      onSubmit={onSubmit}
    />
  )
}

export default CreateOficina
