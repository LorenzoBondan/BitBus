import NavButton from '../../components/buttons/NavButton'

const Memoria = () => {
  const cn = {
    header: 'flex justify-between',
  }

  return (
    <div>
      <div className={cn.header}>
        <div />
        <NavButton linkto={'/acervo/memoria/novo'} text={'Nova memória'} />
      </div>
    </div>
  )
}

export default Memoria
