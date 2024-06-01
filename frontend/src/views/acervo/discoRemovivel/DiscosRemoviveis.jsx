import { useState } from 'react'
import NavButton from '../../../components/buttons/NavButton'
import Filter from '../../../components/ui/Filter'
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
        <Filter onSubmitFilter={setNome} className={cn.filter} />
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
