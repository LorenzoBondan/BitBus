import Tabs from '../components/ui/Tabs'
import { useState } from 'react'
import Memoria from '../views/acervo/Memoria'
import Processador from '../views/acervo/Processador'
import DiscoRemovivel from '../views/acervo/DiscoRemovivel'
import Periferico from '../views/acervo/Periferico'
import Software from '../views/acervo/Software'
import Placa from '../views/acervo/Placa'

const Acervo = () => {
  const [tabSelected, setTabSelected] = useState('memoria')

  const tabs = [
    { id: 'memoria', text: 'Memória' },
    { id: 'processador', text: 'Processador' },
    { id: 'discoRemovivel', text: 'Disco Removível' },
    { id: 'periferico', text: 'Periférico' },
    { id: 'software', text: 'Software' },
    { id: 'placa', text: 'Placa' },
  ]

  const renderCategory = () => {
    switch (tabSelected) {
      case 'memoria':
        return <Memoria />
      case 'processador':
        return <Processador />
      case 'discoRemovivel':
        return <DiscoRemovivel />
      case 'periferico':
        return <Periferico />
      case 'software':
        return <Software />
      case 'placa':
        return <Placa />
    }
  }

  const cn = {
    tabs: 'flex gap-1 w-full justify-center',
  }

  return (
    <div>
      <Tabs
        tabs={tabs}
        className={cn.tabs}
        activeTabId={tabSelected}
        onTabSelect={(tab) => setTabSelected(tab.id)}
      />

      {renderCategory()}
    </div>
  )
}

export default Acervo
