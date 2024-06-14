import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { useGetMemorias, useDeleteMemoria } from '../rest/memoriaRestHooks'

import { Table, TableName, ManageControls } from '../components/tables'
import ValueDisplay from '../components/ui/ValueDisplay'
import Pagination from '../components/ui/Pagination'

const propTypes = {
  filters: PT.object,
}

const DoacoesTable = ({ filters }) => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetMemorias({
    queryParams: { page, size: 15, sort: 'nome,ASC', ...filters },
  })

  useEffect(() => {
    refetch({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters])

  // dynamic columns
  const doacaoTableColumns = useMemo(
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
  const doacaoTableData = data.content.map((mem) =>
    pipe(
      assoc('item', <MemoriaTableName {...{ mem }} />),
      assoc('dimensions', <Dimensions {...{ mem }} />),
      assoc('quantidade', mem?.quantidade),
      assoc('manage', <MemoriaManage {...{ mem }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && doacaoTableData.length === 0)
    return <div className={cn.noData}>Não foram encontradas memórias.</div>

  return (
    <>
      <Table columns={doacaoTableColumns} data={doacaoTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

DoacoesTable.propTypes = propTypes

export default DoacoesTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const MemoriaTableName = ({ mem }) => {
  return <TableName name={mem?.nome} subtext={`Ano: ${mem.ano}`} />
}

MemoriaTableName.propTypes = {
  mem: PT.object.isRequired,
}

const Dimensions = ({ mem }) => {
  const cn = {
    root: 'leading-3 whitespace-pre',
  }

  return (
    <div>
      <ValueDisplay
        label="Altura"
        value={mem?.altura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Largura"
        value={mem?.largura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Espessura"
        value={mem?.espessura || ''}
        className={cn.root}
      />
    </div>
  )
}

Dimensions.propTypes = {
  mem: PT.object.isRequired,
}

const MemoriaManage = ({ mem }) => {
  const navigate = useNavigate()
  const { nome } = mem
  const { deleteMemoria } = useDeleteMemoria()

  const onDelete = () => deleteMemoria(mem?.id)

  const onView = () => navigate(`/acervo/memoria/${mem?.id}`)

  const onEdit = () => navigate(`/acervo/memoria/${mem?.id}/alterar`)

  return <ManageControls {...{ name: nome, onDelete, onEdit, onView }} />
}

MemoriaManage.propTypes = {
  mem: PT.object.isRequired,
}
