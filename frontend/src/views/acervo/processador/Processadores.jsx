import NavButton from '../../../components/buttons/NavButton'
import ProcessadoresTable from '../../../tables/ProcessadoresTable'

const Processadores = () => {
  const cn = {
    header: 'flex justify-end my-5',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/acervo/processador/novo'} text={'Novo processador'} />
      </div>
      <ProcessadoresTable />
    </div>
  )
}

export default Processadores
