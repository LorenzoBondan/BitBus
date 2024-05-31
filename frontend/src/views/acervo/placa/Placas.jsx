import { useState } from 'react'
import NavButton from '../../../components/buttons/NavButton'
import PlacasTable from '../../../tables/PlacasTable'
import AcervoFilter from '../../../components/ui/AcervoFilter'

const Placas = () => {
  const [nome, setNome] = useState('')

  const cn = {
    header: 'flex justify-between my-5',
    filter: 'max-w-lg mb-8 w-full',
  }

  return (
    <div>
      <div className={cn.header}>
        <AcervoFilter onSubmitFilter={setNome} className={cn.filter} />
        <NavButton linkto={'/acervo/placa/novo'} text={'Nova placa'} />
      </div>
      <PlacasTable filters={{ nome }} />
    </div>
  )
}

export default Placas
