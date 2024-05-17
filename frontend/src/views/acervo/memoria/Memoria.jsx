import PT from 'prop-types'
import Panel from '../../../components/ui/Panel'
import PanelTitle from '../../../components/ui/PanelTitle'
import ValueDisplay from '../../../components/ui/ValueDisplay'
import LinkList from '../../LinkList'
import VertValueDisplay from '../../../components/ui/VertValueDisplay'

const propTypes = {
  memoria: PT.object,
  className: PT.string, // applied to root container
}

const Memoria = ({ memoria, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay label="Nome" value={memoria?.nome || ''} />
        <ValueDisplay label="Ano" value={memoria?.ano || ''} />
        <ValueDisplay label="Quantidade" value={memoria?.quantidade || ''} />
        <ValueDisplay label="Altura" value={memoria?.altura || ''} />
        <ValueDisplay label="Largura" value={memoria?.largura || ''} />
        <ValueDisplay label="Espessura" value={memoria?.espessura || ''} />
        <VertValueDisplay
          label="Informações"
          value={memoria?.informacoes || ''}
          className={cn.info}
        />
        <LinkList links={memoria?.links} />
      </Panel>
    </div>
  )
}

Memoria.propTypes = propTypes

export default Memoria
