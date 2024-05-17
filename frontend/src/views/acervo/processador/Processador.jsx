import PT from 'prop-types'
import Panel from '../../../components/ui/Panel'
import PanelTitle from '../../../components/ui/PanelTitle'
import ValueDisplay from '../../../components/ui/ValueDisplay'
import LinkList from '../../LinkList'
import VertValueDisplay from '../../../components/ui/VertValueDisplay'

const propTypes = {
  processador: PT.object,
  className: PT.string, // applied to root container
}

const Processador = ({ processador, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay label="Nome" value={processador?.nome || ''} />
        <ValueDisplay label="Ano" value={processador?.ano || ''} />
        <ValueDisplay label="Quantidade" value={processador?.quantidade || ''} />
        <ValueDisplay label="Altura" value={processador?.altura || ''} />
        <ValueDisplay label="Largura" value={processador?.largura || ''} />
        <ValueDisplay label="Espessura" value={processador?.espessura || ''} />
        <VertValueDisplay
          label="Informações"
          value={processador?.informacoes || ''}
          className={cn.info}
        />
        <LinkList links={processador?.links} />
      </Panel>
    </div>
  )
}

Processador.propTypes = propTypes

export default Processador
