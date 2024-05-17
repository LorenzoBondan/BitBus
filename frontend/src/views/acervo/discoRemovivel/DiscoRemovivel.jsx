import PT from 'prop-types'
import Panel from '../../../components/ui/Panel'
import PanelTitle from '../../../components/ui/PanelTitle'
import ValueDisplay from '../../../components/ui/ValueDisplay'
import LinkList from '../../LinkList'
import VertValueDisplay from '../../../components/ui/VertValueDisplay'

const propTypes = {
  discoRemovivel: PT.object,
  className: PT.string, // applied to root container
}

const DiscoRemovivel = ({ discoRemovivel, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay label="Nome" value={discoRemovivel?.nome || ''} />
        <ValueDisplay label="Ano" value={discoRemovivel?.ano || ''} />
        <ValueDisplay label="Quantidade" value={discoRemovivel?.quantidade || ''} />
        <ValueDisplay label="Altura" value={discoRemovivel?.altura || ''} />
        <ValueDisplay label="Largura" value={discoRemovivel?.largura || ''} />
        <ValueDisplay label="Espessura" value={discoRemovivel?.espessura || ''} />
        <VertValueDisplay
          label="Informações"
          value={discoRemovivel?.informacoes || ''}
          className={cn.info}
        />
        <LinkList links={discoRemovivel?.links} />
      </Panel>
    </div>
  )
}

DiscoRemovivel.propTypes = propTypes

export default DiscoRemovivel
