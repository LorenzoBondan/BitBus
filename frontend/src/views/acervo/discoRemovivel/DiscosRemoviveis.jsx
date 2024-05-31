import { useState } from 'react'
import NavButton from '../../../components/buttons/NavButton'
import AcervoFilter from '../../../components/ui/AcervoFilter'
import DiscosRemoviveisTable from '../../../tables/DiscosRemoviveisTable'

const DiscosRemoviveis = () => {
  const [nome, setNome] = useState('')

  const cn = {
    header: 'flex justify-between my-5',
    filter: 'max-w-lg mb-8 w-full',
  }

  return (
    <div>
      <div className={cn.header}>
        <AcervoFilter onSubmitFilter={setNome} className={cn.filter} />
        <NavButton
          linkto={'/acervo/disco_removivel/novo'}
          text={'Novo disco removível'}
        />
      </div>
      <DiscosRemoviveisTable filters={{ nome }} />
    </div>
  )
}

export default DiscosRemoviveis
