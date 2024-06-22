import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { Table, ManageControls, TableName } from '../components/tables'
import Pagination from '../components/ui/Pagination'
import { useDeleteOficina, useGetOficinas } from '../rest/oficinaRestHooks'
import { dateTimeFormatter, timeFormatter } from '../utils/generalUtils'

const propTypes = {}

const OficinasTable = () => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetOficinas({
    queryParams: { page, size: 15, sort: 'horario,DESC' },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // dynamic columns
  const oficinaTableColumns = useMemo(
    () =>
      pipe(
        append({ Header: '', accessor: 'item' }),
        append({ Header: 'Início', accessor: 'ini' }),
        append({ Header: 'Local', accessor: 'local' }),
        append({ Header: 'Palestrante', accessor: 'responsavel' }),
        append({ Header: 'Ações', accessor: 'manage' })
      )([]),
    []
  )

  // dynamic table content
  const oficinaTableData = data.content.map((ofi) =>
    pipe(
      assoc('item', <OficinaTableName {...{ ofi }} />),
      assoc('ini', dateTimeFormatter(ofi.horario)),
      assoc('local', ofi?.local),
      assoc('responsavel', ofi?.palestrante?.nome),
      assoc('manage', <OficinaManage {...{ ofi }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && oficinaTableData.length === 0)
    return <div className={cn.noData}>Não foram encontradas oficinas.</div>

  return (
    <>
      <Table columns={oficinaTableColumns} data={oficinaTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

OficinasTable.propTypes = propTypes

export default OficinasTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const OficinaTableName = ({ ofi }) => {
  return (
    <TableName
      name={ofi?.titulo}
      subtext={`Duração: ${timeFormatter(ofi?.duracao)}`}
    />
  )
}

OficinaTableName.propTypes = {
  ofi: PT.object.isRequired,
}

const OficinaManage = ({ ofi }) => {
  const navigate = useNavigate()
  const { titulo } = ofi
  const { deleteOficina } = useDeleteOficina()

  const onDelete = () => deleteOficina(ofi?.id)

  const onView = () => navigate(`/oficinas/${ofi?.id}`)

  const onEdit = () => navigate(`/oficinas/${ofi?.id}/alterar`)

  return <ManageControls {...{ name: titulo, onDelete, onEdit, onView }} />
}

OficinaManage.propTypes = {
  ofi: PT.object.isRequired,
}
