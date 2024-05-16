import NavButton from '../../../components/buttons/NavButton'
import { useGetMemorias } from '../../../rest/memoriaRestHooks'
import MemoriasTable from '../../../tables/MemoriasTable'

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
        <MemoriasTable />
      </div>
    </div>
  )
}

export default Memorias
