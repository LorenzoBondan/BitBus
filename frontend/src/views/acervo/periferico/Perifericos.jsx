import { useState } from 'react'
import NavButton from '../../../components/buttons/NavButton'
import PerifericosTable from '../../../tables/PerifericosTable'
import Filter from '../../../components/ui/Filter'

const Perifericos = () => {
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
          linkto={'/acervo/periferico/novo'}
          text={'Novo periférico'}
        />
      </div>
      <PerifericosTable filters={{ nome }} />
    </div>
  )
}

export default Perifericos
