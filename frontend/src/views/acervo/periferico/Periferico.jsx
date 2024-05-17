import PT from 'prop-types'
import Panel from '../../../components/ui/Panel'
import PanelTitle from '../../../components/ui/PanelTitle'
import ValueDisplay from '../../../components/ui/ValueDisplay'
import LinkList from '../../LinkList'
import VertValueDisplay from '../../../components/ui/VertValueDisplay'

const propTypes = {
  periferico: PT.object,
  className: PT.string, // applied to root container
}

const Periferico = ({ periferico, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay label="Nome" value={periferico?.nome || ''} />
        <ValueDisplay label="Ano" value={periferico?.ano || ''} />
        <ValueDisplay label="Quantidade" value={periferico?.quantidade || ''} />
        <ValueDisplay label="Altura" value={periferico?.altura || ''} />
        <ValueDisplay label="Largura" value={periferico?.largura || ''} />
        <ValueDisplay label="Espessura" value={periferico?.espessura || ''} />
        <VertValueDisplay
          label="Informações"
          value={periferico?.informacoes || ''}
          className={cn.info}
        />
        <LinkList links={periferico?.links} />
      </Panel>
    </div>
  )
}

Periferico.propTypes = propTypes

export default Periferico
