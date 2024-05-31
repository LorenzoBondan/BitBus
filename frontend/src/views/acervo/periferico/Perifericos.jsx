import { useState } from 'react'
import NavButton from '../../../components/buttons/NavButton'
import PerifericosTable from '../../../tables/PerifericosTable'
import AcervoFilter from '../../../components/ui/AcervoFilter'

const Perifericos = () => {
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
          linkto={'/acervo/periferico/novo'}
          text={'Novo periférico'}
        />
      </div>
      <PerifericosTable filters={{ nome }} />
    </div>
  )
}

export default Perifericos
