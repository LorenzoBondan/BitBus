import NavButton from '../components/buttons/NavButton'
import VisitasTable from '../tables/VisitasTable'

const Visitas = () => {
  const cn = {
    header: 'flex justify-end my-5',
    filter: 'max-w-lg mb-8 w-full',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/visitas/nova'} text={'Nova Visita'} />
      </div>
      <VisitasTable />
    </div>
  )
}

export default Visitas
