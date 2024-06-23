import Tabs from '../components/ui/Tabs'
import PageTitle from '../components/ui/PageTitle'
import { useState } from 'react'
import Papeis from '../views/pessoa/papel/Papeis'
import TiposItens from '../views/acervo/tipoItem/TiposItens'

const Categorias = () => {
  const [categoria, setCategoria] = useState('papel')

  const tabs = [
    { id: 'papel', text: 'Funções' },
    { id: 'tipoItem', text: 'Tipos de Itens' },
  ]

  const renderCategory = () => {
    switch (categoria) {
      case 'papel':
        return <Papeis />
      case 'tipoItem':
        return <TiposItens />
    }
  }

  const cn = {
    container: '',
    tabs: 'flex gap-1 w-full',
  }

  return (
    <div className={cn.container}>
      <PageTitle>Categorias</PageTitle>
      <Tabs
        tabs={tabs}
        className={cn.tabs}
        activeTabId={categoria}
        onTabSelect={(tab) => setCategoria(tab.id)}
      />

      {renderCategory()}
    </div>
  )
}

export default Categorias
