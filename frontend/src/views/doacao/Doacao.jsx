import PT from 'prop-types'
import PanelTitle from '../../components/ui/PanelTitle'
import Panel from '../../components/ui/Panel'
import ValueDisplay from '../../components/ui/ValueDisplay'

const propTypes = {
  doacao: PT.object,
  className: PT.string, // applied to root container
}

const Doacao = ({ doacao, className }) => {
  const cn = {
    root: `${className}`,
    info: 'text-justify',
  }

  return (
    <div className={cn.root}>
      <PanelTitle text="Detalhes" />
      <Panel>
        <ValueDisplay label="Descrição" value={doacao?.descricao || ''} />
        <ValueDisplay label="Doador" value={doacao?.doador.nome || ''} />
        <ValueDisplay label="Contato" value={doacao?.doador.email || ''} />

        <DoacaoList doacao={doacao} />
      </Panel>
    </div>
  )
}

Doacao.propTypes = propTypes

export default Doacao

const DoacaoList = ({ doacao }) => {
  const cn = {
    container: 'text-sm',
    label: 'text-slate-400',
    item: 'py-1 px-2',
  }

  return (
    <div className={cn.container}>
      <div className={cn.label}>Doações</div>
      {doacao.valor && (
        <div className={cn.item}>
          {doacao.valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'brl',
          })}
        </div>
      )}
      {doacao.itensIds.map((id) => {
        return (
          <div className={cn.item} key={id}>
            {id}
          </div>
        )
      })}
    </div>
  )
}

DoacaoList.propTypes = {
  doacao: PT.object,
}
