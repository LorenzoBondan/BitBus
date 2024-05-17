import PT from 'prop-types'
import Panel from '../../../components/ui/Panel'
import PanelTitle from '../../../components/ui/PanelTitle'
import ValueDisplay from '../../../components/ui/ValueDisplay'
import LinkList from '../../LinkList'
import VertValueDisplay from '../../../components/ui/VertValueDisplay'

const propTypes = {
  software: PT.object,
  className: PT.string, // applied to root container
}

const Software = ({ software, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay label="Nome" value={software?.nome || ''} />
        <ValueDisplay label="Ano" value={software?.ano || ''} />
        <ValueDisplay label="Quantidade" value={software?.quantidade || ''} />
        <ValueDisplay label="Altura" value={software?.altura || ''} />
        <ValueDisplay label="Largura" value={software?.largura || ''} />
        <ValueDisplay label="Espessura" value={software?.espessura || ''} />
        <VertValueDisplay
          label="Informações"
          value={software?.informacoes || ''}
          className={cn.info}
        />
        <LinkList links={software?.links} />
      </Panel>
    </div>
  )
}

Software.propTypes = propTypes

export default Software
