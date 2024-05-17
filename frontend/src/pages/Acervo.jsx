import Tabs from '../components/ui/Tabs'
import Processadores from '../views/acervo/processador/Processadores'
import DiscosRemoviveis from '../views/acervo/discoRemovivel/DiscosRemoviveis'
import Perifericos from '../views/acervo/periferico/Perifericos'
import Softwares from '../views/acervo/software/Softwares'
import Placas from '../views/acervo/placa/Placas'
import PageTitle from '../components/ui/PageTitle'
import Memorias from '../views/acervo/memoria/Memorias'
import { useItemAcervoTab } from '../state/appState'

const Acervo = () => {
  const {itemAcervoTab, setItemAcervoTab} = useItemAcervoTab()

  const tabs = [
    { id: 'memoria', text: 'Memória' },
    { id: 'processador', text: 'Processador' },
    { id: 'discoRemovivel', text: 'Disco Removível' },
    { id: 'periferico', text: 'Periférico' },
    { id: 'software', text: 'Software' },
    { id: 'placa', text: 'Placa' },
  ]

  const renderCategory = () => {
    switch (itemAcervoTab) {
      case 'memoria':
        return <Memorias />
      case 'processador':
        return <Processadores />
      case 'discoRemovivel':
        return <DiscosRemoviveis />
      case 'periferico':
        return <Perifericos />
      case 'software':
        return <Softwares />
      case 'placa':
        return <Placas />
    }
  }

  const cn = {
    container: '',
    tabs: 'flex gap-1 w-full',
  }

  return (
    <div className={cn.container}>
      <PageTitle>Acervo</PageTitle>
      <Tabs
        tabs={tabs}
        className={cn.tabs}
        activeTabId={itemAcervoTab}
        onTabSelect={(tab) => setItemAcervoTab(tab.id)}
      />

      {renderCategory()}
    </div>
  )
}

export default Acervo
