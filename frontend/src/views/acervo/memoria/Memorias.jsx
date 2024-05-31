import { useState } from 'react'
import NavButton from '../../../components/buttons/NavButton'
import AcervoFilter from '../../../components/ui/AcervoFilter'
import MemoriasTable from '../../../tables/MemoriasTable'

const Memorias = () => {
  const [nome, setNome] = useState('')

  const cn = {
    header: 'flex justify-between my-5',
    filter: 'max-w-lg mb-8 w-full',
  }

  const filters = {
    nome,
  }

  return (
    <div>
      <div className={cn.header}>
        <AcervoFilter onSubmitFilter={setNome} className={cn.filter} />
        <NavButton linkto={'/acervo/memoria/novo'} text={'Nova memória'} />
      </div>
      <MemoriasTable filters={filters} />
    </div>
  )
}

export default Memorias
