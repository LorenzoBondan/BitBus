import PT from 'prop-types'

const propTypes = {
  papeis: PT.arrayOf(PT.object),
}

const PapeisList = ({ papeis = [] }) => {
  const cn = {
    container: '',
    title: 'text-slate-300 font-semibold',
    link: 'text-zinc-400 text-sm pl-2',
    linkTag: 'hover:text-zinc-200',
  }

  return (
    <div className={cn.container}>
      {papeis.length > 0 && (
        <>
          <div className={cn.title}>Funções:</div>
          {papeis.map((p, i) => (
            <div className={cn.link} key={i}>
              - {p.descricao}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

PapeisList.propTypes = propTypes
export default PapeisList
