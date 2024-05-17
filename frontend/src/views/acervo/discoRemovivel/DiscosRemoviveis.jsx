import NavButton from '../../../components/buttons/NavButton'
import DiscosRemovives from '../../../tables/DiscosRemoviveisTable'

const DiscosRemoviveis = () => {
  const cn = {
    header: 'flex justify-end my-5',
  }

  return (
    <div>
      <div className={cn.header}>
        <NavButton linkto={'/acervo/disco_removivel/novo'} text={'Novo disco removível'} />
      </div>
      <DiscosRemovives />
    </div>
  )
}

export default DiscosRemoviveis
