import DiscoRemovivelForm from '../forms/DiscoRemovivelForm'
import { useCreateDiscoRemovivel } from '../rest/discoRemovivelRestHooks'

const CreateDiscoRemovivel = () => {
  const { createDiscoRemovivel } = useCreateDiscoRemovivel({
    onSuccess: { routeTo: '/acervo' },
  })

  const onSubmit = async (data) => {
    await createDiscoRemovivel(data)
  }

  return (
    <DiscoRemovivelForm
      navToOnCancel={'/acervo'}
      title={'Novo Disco Removível'}
      onSubmit={onSubmit}
    />
  )
}

export default CreateDiscoRemovivel
