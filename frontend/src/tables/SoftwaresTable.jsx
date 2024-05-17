import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { useGetSoftwares, useDeleteSoftware } from '../rest/softwareRestHooks'

import { Table, TableName, ManageControls } from '../components/tables'
import ValueDisplay from '../components/ui/ValueDisplay'
import Pagination from '../components/ui/Pagination'

const SoftwaresTable = () => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetSoftwares({
    queryParams: { page, size: 5, sort: 'nome,ASC' },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // dynamic columns
  const softwareTableColumns = useMemo(() =>
    pipe(
      append({ Header: '', accessor: 'item' }),
      append({ Header: 'Dimensões', accessor: 'dimensions' }),
      append({
        Header: 'Quantidade',
        accessor: 'quantidade',
      }),
      append({ Header: 'Ações', accessor: 'manage' })
    )([]), []
  )

  // dynamic table content
  const softwareTableData = data.content.map((soft) =>
    pipe(
      assoc('item', <SoftwareTableName {...{ soft }} />),
      assoc('dimensions', <Dimensions {...{ soft }} />),
      assoc('quantidade', soft?.quantidade),
      assoc('manage', <SoftwareManage {...{ soft }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && softwareTableData.length === 0)
    return <div className={cn.noData}>Não foram encontrados softwares.</div>

  return (
    <>
      <Table columns={softwareTableColumns} data={softwareTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

export default SoftwaresTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const SoftwareTableName = ({ soft }) => {
  return <TableName name={soft?.nome} subtext={`Ano: ${soft.ano}`} />
}

SoftwareTableName.propTypes = {
  soft: PT.object.isRequired,
}

const Dimensions = ({ soft }) => {
  const cn = {
    root: 'leading-3 whitespace-pre',
  }

  return (
    <div>
      <ValueDisplay
        label="Altura"
        value={soft?.altura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Largura"
        value={soft?.largura || ''}
        className={cn.root}
      />
      <ValueDisplay
        label="Espessura"
        value={soft?.espessura || ''}
        className={cn.root}
      />
    </div>
  )
}

Dimensions.propTypes = {
  soft: PT.object.isRequired,
}

const SoftwareManage = ({ soft }) => {
  const navigate = useNavigate()
  const { nome } = soft
  const { deleteSoftware } = useDeleteSoftware()

  const onDelete = () => deleteSoftware(soft?.id)

  const onView = () => navigate(`/acervo/software/${soft?.id}`)

  const onEdit = () => navigate(`/acervo/software/${soft?.id}/alterar`)

  return <ManageControls {...{ name: nome, onDelete, onEdit, onView }} />
}

SoftwareManage.propTypes = {
  soft: PT.object.isRequired,
}
