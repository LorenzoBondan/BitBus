import PT from 'prop-types'
import Panel from '../../../components/ui/Panel'
import PanelTitle from '../../../components/ui/PanelTitle'
import ValueDisplay from '../../../components/ui/ValueDisplay'
import LinkList from '../../LinkList'
import VertValueDisplay from '../../../components/ui/VertValueDisplay'

const propTypes = {
  placa: PT.object,
  className: PT.string, // applied to root container
}

const Placa = ({ placa, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay label="Nome" value={placa?.nome || ''} />
        <ValueDisplay label="Ano" value={placa?.ano || ''} />
        <ValueDisplay label="Quantidade" value={placa?.quantidade || ''} />
        <ValueDisplay label="Altura" value={placa?.altura || ''} />
        <ValueDisplay label="Largura" value={placa?.largura || ''} />
        <ValueDisplay label="Espessura" value={placa?.espessura || ''} />
        <VertValueDisplay
          label="Informações"
          value={placa?.informacoes || ''}
          className={cn.info}
        />
        <LinkList links={placa?.links} />
      </Panel>
    </div>
  )
}

Placa.propTypes = propTypes

export default Placa
