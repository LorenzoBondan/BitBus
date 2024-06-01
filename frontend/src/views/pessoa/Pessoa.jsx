import PT from 'prop-types'
import Panel from '../../components/ui/Panel'
import PanelTitle from '../../components/ui/PanelTitle'
import ValueDisplay from '../../components/ui/ValueDisplay'
import PapeisList from './papel/PapeisList'

const propTypes = {
  pessoa: PT.object,
  className: PT.string, // applied to root container
}

const Pessoa = ({ pessoa, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay label="Nome" value={pessoa?.nome || ''} />
        <ValueDisplay label="Email" value={pessoa?.email || ''} />
        {pessoa?.curriculo && (
          <ValueDisplay label="Currículo" value={pessoa?.curriculo || ''} />
        )}

        <PapeisList papeis={pessoa?.papeis} />
      </Panel>
    </div>
  )
}

Pessoa.propTypes = propTypes

export default Pessoa
