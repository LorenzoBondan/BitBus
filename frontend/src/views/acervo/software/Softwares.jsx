import { useState } from 'react'
import NavButton from '../../../components/buttons/NavButton'
import AcervoFilter from '../../../components/ui/AcervoFilter'
import SoftwaresTable from '../../../tables/SoftwaresTable'

const Softwares = () => {
  const [nome, setNome] = useState('')

  const cn = {
    header: 'flex justify-between my-5',
    filter: 'max-w-lg mb-8 w-full',
  }

  return (
    <div>
      <div className={cn.header}>
        <AcervoFilter onSubmitFilter={setNome} className={cn.filter} />
        <NavButton linkto={'/acervo/software/novo'} text={'Novo software'} />
      </div>
      <SoftwaresTable filters={{ nome }} />
    </div>
  )
}

export default Softwares
