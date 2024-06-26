import { useState } from 'react'
import NavButton from '../../../components/buttons/NavButton'
import ProcessadoresTable from '../../../tables/ProcessadoresTable'
import Filter from '../../../components/ui/Filter'

const Processadores = () => {
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
          linkto={'/acervo/processador/novo'}
          text={'Novo processador'}
        />
      </div>
      <ProcessadoresTable filters={{ nome }} />
    </div>
  )
}

export default Processadores
