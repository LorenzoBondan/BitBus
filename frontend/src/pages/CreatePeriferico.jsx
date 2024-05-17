import PerifericoForm from '../forms/PerifericoForm'
import { useCreatePeriferico } from '../rest/perifericoRestHooks'

const CreatePeriferico = () => {
  const { createPeriferico } = useCreatePeriferico({
    onSuccess: { routeTo: '/acervo' },
  })

  const onSubmit = async (data) => {
    await createPeriferico(data)
  }

  return (
    <PerifericoForm
      navToOnCancel={'/acervo'}
      title={'Novo Periferico'}
      onSubmit={onSubmit}
    />
  )
}

export default CreatePeriferico
