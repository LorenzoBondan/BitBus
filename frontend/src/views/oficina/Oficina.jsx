import PT from 'prop-types'
import Panel from '../../components/ui/Panel'
import PanelTitle from '../../components/ui/PanelTitle'
import ValueDisplay from '../../components/ui/ValueDisplay'
import { dateTimeFormatter, timeFormatter } from '../../utils/generalUtils'
import VertValueDisplay from '../../components/ui/VertValueDisplay'

const propTypes = {
  oficina: PT.object,
  className: PT.string, // applied to root container
}

const Oficina = ({ oficina, className }) => {
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
          value={oficina?.horario ? dateTimeFormatter(oficina?.horario) : ''}
        />
        <ValueDisplay
          label="Duração"
          value={oficina?.duracao ? timeFormatter(oficina?.duracao) : ''}
        />
        <ValueDisplay label="Local" value={oficina?.local || ''} />
        <ValueDisplay
          label="Palestrante"
          value={oficina?.palestrante?.nome || ''}
        />
        <ValueDisplay
          label="Contato"
          value={oficina?.palestrante?.email || ''}
        />
        <ValueDisplay label="Título" value={oficina?.titulo} />
        <VertValueDisplay label="Resumo" value={oficina?.resumo} />
      </Panel>
    </div>
  )
}

Oficina.propTypes = propTypes

export default Oficina
