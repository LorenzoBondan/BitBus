import NavButton from '../components/buttons/NavButton'
import OficinasTable from '../tables/OficinasTable'

const Oficinas = () => {
  const cn = {
    header: 'flex justify-end my-5',
    filter: 'max-w-lg mb-8 w-full',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/oficinas/nova'} text={'Nova Oficina'} />
      </div>
      <OficinasTable />
    </div>
  )
}

export default Oficinas
