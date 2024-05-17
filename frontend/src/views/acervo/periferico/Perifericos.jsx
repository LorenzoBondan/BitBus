import NavButton from '../../../components/buttons/NavButton'
import PerifericosTable from '../../../tables/PerifericosTable'

const Perifericos = () => {
  const cn = {
    header: 'flex justify-end my-5',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/acervo/periferico/novo'} text={'Novo periférico'} />
      </div>
      <PerifericosTable />
    </div>
  )
}

export default Perifericos
