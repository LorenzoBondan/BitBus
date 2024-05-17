import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { useGetPlacas, useDeletePlaca } from '../rest/placaRestHooks'

import { Table, TableName, ManageControls } from '../components/tables'
import ValueDisplay from '../components/ui/ValueDisplay'
import Pagination from '../components/ui/Pagination'

const PlacasTable = () => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetPlacas({
    queryParams: { page, size: 5, sort: 'nome,ASC' },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // dynamic columns
  const placaTableColumns = useMemo(() =>
    pipe(
      append({ Header: '', accessor: 'item' }),
      append({ Header: 'Dimensões', accessor: 'dimensions' }),
      append({
        Header: 'Quantidade',
        accessor: 'quantidade',
      }),
      append({
        Header: 'Classificação',
        accessor: 'classificacao',
      }),
      append({ Header: 'Ações', accessor: 'manage' })
    )([]), []
  )

  // dynamic table content
  const placaTableData = data.content.map((pla) =>
    pipe(
      assoc('item', <PlacaTableName {...{ pla }} />),
      assoc('dimensions', <Dimensions {...{ pla }} />),
      assoc('quantidade', pla?.quantidade),
      assoc('classificacao', pla?.classificacao),
      assoc('manage', <PlacaManage {...{ pla }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && placaTableData.length === 0)
    return <div className={cn.noData}>Não foram encontradas placas.</div>

  return (
    <>
      <Table columns={placaTableColumns} data={placaTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

export default PlacasTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const PlacaTableName = ({ pla }) => {
  return <TableName name={pla?.nome} subtext={`Ano: ${pla.ano}`} />
}

PlacaTableName.propTypes = {
  pla: PT.object.isRequired,
}

const Dimensions = ({ pla }) => {
  const cn = {
    root: 'leading-3 whitespace-pre',
  }

  return (
    <div>
      <ValueDisplay
        label="Altura"
        value={pla?.altura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Largura"
        value={pla?.largura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Espessura"
        value={pla?.espessura || ''}
        className={cn.root}
      />
    </div>
  )
}

Dimensions.propTypes = {
  pla: PT.object.isRequired,
}

const PlacaManage = ({ pla }) => {
  const navigate = useNavigate()
  const { nome } = pla
  const { deletePlaca } = useDeletePlaca()

  const onDelete = () => deletePlaca(pla?.id)

  const onView = () => navigate(`/acervo/placa/${pla?.id}`)

  const onEdit = () => navigate(`/acervo/placa/${pla?.id}/alterar`)

  return <ManageControls {...{ name: nome, onDelete, onEdit, onView }} />
}

PlacaManage.propTypes = {
  pla: PT.object.isRequired,
}
