import PT from 'prop-types'
import Panel from '../../components/ui/Panel'
import PanelTitle from '../../components/ui/PanelTitle'
import ValueDisplay from '../../components/ui/ValueDisplay'
import { dateTimeFormatter } from '../../utils/generalUtils'

const propTypes = {
  visita: PT.object,
  className: PT.string, // applied to root container
}

const Visita = ({ visita, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay
          label="Início"
          value={
            visita?.dataInicio ? dateTimeFormatter(visita?.dataInicio) : ''
          }
        />
        <ValueDisplay
          label="Fim"
          value={visita?.dataFim ? dateTimeFormatter(visita?.dataFim) : ''}
        />
        <ValueDisplay label="Local" value={visita?.local || ''} />
        <ValueDisplay
          label="Responsável"
          value={visita?.responsavel.nome || ''}
        />
        <VisitantesList visitantes={visita.visitantes} />
      </Panel>
    </div>
  )
}

Visita.propTypes = propTypes

export default Visita

const VisitantesList = ({ visitantes }) => {
  const cn = {
    container: 'text-sm',
    label: 'text-gray-600',
    itens: 'pl-2 text-gray-900',
  }
  return (
    <div className={cn.container}>
      <div className={cn.label}>Visitantes</div>
      <div className={cn.itens}>
        {visitantes.map((v) => (
          <div key={v.id}>
            {v.nome} ({v.email})
          </div>
        ))}
      </div>
    </div>
  )
}

VisitantesList.propTypes = {
  visitantes: PT.array,
}
