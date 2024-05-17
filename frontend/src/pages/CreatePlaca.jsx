import PlacaForm from '../forms/PlacaForm'
import { useCreatePlaca } from '../rest/processadorRestHooks'

const CreatePlaca = () => {
  const { createPlaca } = useCreatePlaca({
    onSuccess: { routeTo: '/acervo' },
  })

  const onSubmit = async (data) => {
    await createPlaca(data)
  }

  return (
    <PlacaForm
      navToOnCancel={'/acervo'}
      title={'Nova Placa'}
      onSubmit={onSubmit}
    />
  )
}

export default CreatePlaca
