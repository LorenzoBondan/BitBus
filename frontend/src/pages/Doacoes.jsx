import NavButton from '../components/buttons/NavButton'
import DoacoesTable from '../tables/DoacoesTable'

const Doacoes = () => {
  const cn = {
    header: 'flex justify-end my-5',
    filter: 'max-w-lg mb-8 w-full',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/doacoes/nova'} text={'Nova Doação'} />
      </div>
      <DoacoesTable />
    </div>
  )
}

export default Doacoes
