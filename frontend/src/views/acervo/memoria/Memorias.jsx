import { PlusIcon } from '@heroicons/react/24/outline'
import NavButton from '../../../components/buttons/NavButton'
import { useGetMemorias } from '../../../rest/memoriaRestHooks'

const Memorias = () => {
  const { data } = useGetMemorias()

  console.log(data)
  const cn = {
    header: 'flex justify-between mt-5',
  }

  return (
    <div>
      <div className={cn.header}>
        <div />
        <NavButton linkto={'/acervo/memoria/novo'} text={'Nova memória'} />
      </div>
    </div>
  )
}

export default Memorias
