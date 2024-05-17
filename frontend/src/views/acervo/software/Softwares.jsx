import NavButton from '../../../components/buttons/NavButton'
import SoftwaresTable from '../../../tables/SoftwaresTable'

const Softwares = () => {
  const cn = {
    header: 'flex justify-end my-5',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/acervo/software/novo'} text={'Novo software'} />
      </div>
      <SoftwaresTable />
    </div>
  )
}

export default Softwares
