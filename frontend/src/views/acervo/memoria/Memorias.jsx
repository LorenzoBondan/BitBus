import NavButton from '../../../components/buttons/NavButton'
import { useGetMemorias } from '../../../rest/memoriaRestHooks'
import MemoriasTable from '../../../tables/MemoriasTable'

const Memorias = () => {
  const { data } = useGetMemorias()

  console.log(data)
  const cn = {
    header: 'flex justify-end my-5',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/acervo/memoria/novo'} text={'Nova memória'} />
      </div>
      <MemoriasTable />
    </div>
  )
}

export default Memorias
