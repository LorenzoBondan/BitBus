import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { useGetPerifericos, useDeletePeriferico } from '../rest/perifericoRestHooks'

import { Table, TableName, ManageControls } from '../components/tables'
import ValueDisplay from '../components/ui/ValueDisplay'
import Pagination from '../components/ui/Pagination'

const PerifericosTable = () => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetPerifericos({
    queryParams: { page, size: 5, sort: 'nome,ASC' },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // dynamic columns
  const perifericoTableColumns = useMemo(() =>
    pipe(
      append({ Header: '', accessor: 'item' }),
      append({ Header: 'Dimensões', accessor: 'dimensions' }),
      append({
        Header: 'Quantidade',
        accessor: 'quantidade',
      }),
      append({ Header: 'Tipo', accessor: 'tipo' }),
      append({ Header: 'Ações', accessor: 'manage' })
    )([]), []
  )

  // dynamic table content
  const perifericoTableData = data.content.map((per) =>
    pipe(
      assoc('item', <PerifericoTableName {...{ per }} />),
      assoc('dimensions', <Dimensions {...{ per }} />),
      assoc('quantidade', per?.quantidade),
      assoc('tipo', per?.tipoItem.descricao),
      assoc('manage', <PerifericoManage {...{ per }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && perifericoTableData.length === 0)
    return <div className={cn.noData}>Não foram encontrados periféricos.</div>

  return (
    <>
      <Table columns={perifericoTableColumns} data={perifericoTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

export default PerifericosTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const PerifericoTableName = ({ per }) => {
  return <TableName name={per?.nome} subtext={`Ano: ${per.ano}`} />
}

PerifericoTableName.propTypes = {
  per: PT.object.isRequired,
}

const Dimensions = ({ per }) => {
  const cn = {
    root: 'leading-3 whitespace-pre',
  }

  return (
    <div>
      <ValueDisplay
        label="Altura"
        value={per?.altura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Largura"
        value={per?.largura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Espessura"
        value={per?.espessura || ''}
        className={cn.root}
      />
    </div>
  )
}

Dimensions.propTypes = {
  per: PT.object.isRequired,
}

const PerifericoManage = ({ per }) => {
  const navigate = useNavigate()
  const { nome } = per
  const { deletePeriferico } = useDeletePeriferico()

  const onDelete = () => deletePeriferico(per?.id)

  const onView = () => navigate(`/acervo/periferico/${per?.id}`)

  const onEdit = () => navigate(`/acervo/periferico/${per?.id}/alterar`)

  return <ManageControls {...{ name: nome, onDelete, onEdit, onView }} />
}

PerifericoManage.propTypes = {
  per: PT.object.isRequired,
}
