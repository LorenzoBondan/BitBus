import NavButton from '../../../components/buttons/NavButton'
import PlacasTable from '../../../tables/PlacasTable'

const Placas = () => {
  const cn = {
    header: 'flex justify-end my-5',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/acervo/placa/novo'} text={'Nova placa'} />
      </div>
      <PlacasTable />
    </div>
  )
}

export default Placas
