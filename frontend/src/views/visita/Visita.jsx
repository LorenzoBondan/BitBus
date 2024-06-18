import PT from 'prop-types'
import Panel from '../../components/ui/Panel'
import PanelTitle from '../../components/ui/PanelTitle'
import ValueDisplay from '../../components/ui/ValueDisplay'
import { dateTimeFormatter } from '../../utils/generalUtils'
import VertValueDisplay from '../../components/ui/VertValueDisplay'

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
        <VertValueDisplay
          label="visitantes"
          value={visita.visitantesIds.join(', ')}
        />
      </Panel>
    </div>
  )
}

Visita.propTypes = propTypes

export default Visita
