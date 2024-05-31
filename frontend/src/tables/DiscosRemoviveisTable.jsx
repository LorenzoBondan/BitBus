import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import {
  useGetDiscosRemoviveis,
  useDeleteDiscoRemovivel,
} from '../rest/discoRemovivelRestHooks'

import { Table, TableName, ManageControls } from '../components/tables'
import ValueDisplay from '../components/ui/ValueDisplay'
import Pagination from '../components/ui/Pagination'

const propTypes = {
  filters: PT.object,
}

const DiscosRemovivesTable = ({ filters }) => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetDiscosRemoviveis({
    queryParams: { page, size: 5, sort: 'nome,ASC', ...filters },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters])

  // dynamic columns
  const discoRemovivelTableColumns = useMemo(
    () =>
      pipe(
        append({ Header: '', accessor: 'item' }),
        append({ Header: 'Dimensões', accessor: 'dimensions' }),
        append({
          Header: 'Quantidade',
          accessor: 'quantidade',
        }),
        append({ Header: 'Tipo', accessor: 'tipo' }),
        append({ Header: 'Ações', accessor: 'manage' })
      )([]),
    []
  )

  // dynamic table content
  const discoRemovivelTableData = data.content.map((dis) =>
    pipe(
      assoc('item', <DiscoRemovivelTableName {...{ dis }} />),
      assoc('dimensions', <Dimensions {...{ dis }} />),
      assoc('quantidade', dis?.quantidade),
      assoc('tipo', dis?.tipoItem.descricao),
      assoc('manage', <DiscoRemovivelManage {...{ dis }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && discoRemovivelTableData.length === 0)
    return (
      <div className={cn.noData}>Não foram encontrados discos removíves.</div>
    )

  return (
    <>
      <Table
        columns={discoRemovivelTableColumns}
        data={discoRemovivelTableData}
      />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

DiscosRemovivesTable.propTypes = propTypes

export default DiscosRemovivesTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const DiscoRemovivelTableName = ({ dis }) => {
  return <TableName name={dis?.nome} subtext={`Ano: ${dis.ano}`} />
}

DiscoRemovivelTableName.propTypes = {
  dis: PT.object.isRequired,
}

const Dimensions = ({ dis }) => {
  const cn = {
    root: 'leading-3 whitespace-pre',
  }

  return (
    <div>
      <ValueDisplay
        label="Altura"
        value={dis?.altura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Largura"
        value={dis?.largura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Espessura"
        value={dis?.espessura || ''}
        className={cn.root}
      />
    </div>
  )
}

Dimensions.propTypes = {
  dis: PT.object.isRequired,
}

const DiscoRemovivelManage = ({ dis }) => {
  const navigate = useNavigate()
  const { nome } = dis
  const { deleteDiscoRemovivel } = useDeleteDiscoRemovivel()

  const onDelete = () => deleteDiscoRemovivel(dis?.id)

  const onView = () => navigate(`/acervo/disco_removivel/${dis?.id}`)

  const onEdit = () => navigate(`/acervo/disco_removivel/${dis?.id}/alterar`)

  return <ManageControls {...{ name: nome, onDelete, onEdit, onView }} />
}

DiscoRemovivelManage.propTypes = {
  dis: PT.object.isRequired,
}
