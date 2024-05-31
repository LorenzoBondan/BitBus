import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import {
  useGetProcessadores,
  useDeleteProcessador,
} from '../rest/processadorRestHooks'

import { Table, TableName, ManageControls } from '../components/tables'
import ValueDisplay from '../components/ui/ValueDisplay'
import Pagination from '../components/ui/Pagination'

const propTypes = {
  filters: PT.object,
}

const ProcessadoresTable = ({ filters }) => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetProcessadores({
    queryParams: { page, size: 5, sort: 'nome,ASC', ...filters },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters])

  // dynamic columns
  const processadorTableColumns = useMemo(
    () =>
      pipe(
        append({ Header: '', accessor: 'item' }),
        append({ Header: 'Dimensões', accessor: 'dimensions' }),
        append({
          Header: 'Quantidade',
          accessor: 'quantidade',
        }),
        append({ Header: 'Ações', accessor: 'manage' })
      )([]),
    []
  )

  // dynamic table content
  const processadorTableData = data.content.map((pro) =>
    pipe(
      assoc('item', <ProcessadorTableName {...{ pro }} />),
      assoc('dimensions', <Dimensions {...{ pro }} />),
      assoc('quantidade', pro?.quantidade),
      assoc('manage', <ProcessadorManage {...{ pro }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && processadorTableData.length === 0)
    return <div className={cn.noData}>Não foram encontrados processadores.</div>

  return (
    <>
      <Table columns={processadorTableColumns} data={processadorTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

ProcessadoresTable.propTypes = propTypes

export default ProcessadoresTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const ProcessadorTableName = ({ pro }) => {
  return <TableName name={pro?.nome} subtext={`Ano: ${pro.ano}`} />
}

ProcessadorTableName.propTypes = {
  pro: PT.object.isRequired,
}

const Dimensions = ({ pro }) => {
  const cn = {
    root: 'leading-3 whitespace-pre',
  }

  return (
    <div>
      <ValueDisplay
        label="Altura"
        value={pro?.altura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Largura"
        value={pro?.largura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Espessura"
        value={pro?.espessura || ''}
        className={cn.root}
      />
    </div>
  )
}

Dimensions.propTypes = {
  pro: PT.object.isRequired,
}

const ProcessadorManage = ({ pro }) => {
  const navigate = useNavigate()
  const { nome } = pro
  const { deleteProcessador } = useDeleteProcessador()

  const onDelete = () => deleteProcessador(pro?.id)

  const onView = () => navigate(`/acervo/processador/${pro?.id}`)

  const onEdit = () => navigate(`/acervo/processador/${pro?.id}/alterar`)

  return <ManageControls {...{ name: nome, onDelete, onEdit, onView }} />
}

ProcessadorManage.propTypes = {
  pro: PT.object.isRequired,
}
