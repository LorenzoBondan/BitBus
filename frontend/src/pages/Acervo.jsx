import { Link } from 'react-router-dom'
import AcervoTable from '../tables/AcervoTable'

const Acervo = () => {
  const cn = {}

  return (
    <div>
      <Link to="/acervo/novo">Adicionar item no acervo</Link>
      <AcervoTable />
    </div>
  )
}

export default Acervo
