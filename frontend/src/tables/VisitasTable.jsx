import { useEffect, useMemo } from 'react'
import PT from 'prop-types'

import { pipe, append, assoc } from 'ramda'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { Table, ManageControls } from '../components/tables'
import Pagination from '../components/ui/Pagination'
import { useDeleteVisita, useGetVisitas } from '../rest/visitaRestHooks'
import { dateTimeFormatter } from '../utils/generalUtils'
import ValueDisplay from '../components/ui/ValueDisplay'

const propTypes = {}

const VisitasTable = () => {
  const [page, setPage] = useState(0)

  const { data, isLoading, refetch } = useGetVisitas({
    queryParams: { page, size: 15, sort: 'dataInicio,ASC' },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // dynamic columns
  const visitaTableColumns = useMemo(
    () =>
      pipe(
        append({ Header: 'Período', accessor: 'periodo' }),
        append({ Header: 'Local', accessor: 'local' }),
        append({ Header: 'Responsável', accessor: 'responsavel' }),
        append({ Header: 'Ações', accessor: 'manage' })
      )([]),
    []
  )

  // dynamic table content
  const visitaTableData = data.content.map((vis) =>
    pipe(
      assoc('periodo', <Periodo {...{ vis }} />),
      assoc('local', vis?.local),
      assoc('responsavel', vis?.responsavel?.nome),
      assoc('manage', <VisitaManage {...{ vis }} />)
    )({})
  )

  const cn = {
    noData: 'text-center',
  }

  if (isLoading) return <div>Carregando...</div>
  if (!isLoading && visitaTableData.length === 0)
    return <div className={cn.noData}>Não foram encontradas visitas.</div>

  return (
    <>
      <Table columns={visitaTableColumns} data={visitaTableData} />
      {data.totalPages && (
        <Pagination page={page} setPage={setPage} lastPage={data.totalPages} />
      )}
    </>
  )
}

VisitasTable.propTypes = propTypes

export default VisitasTable

//*****************************************************************************
// Helpers
//*****************************************************************************

const Periodo = ({ vis }) => {
  const cn = {
    text: '!mb-0',
  }
  return (
    <div>
      <ValueDisplay
        value={dateTimeFormatter(vis.dataInicio)}
        label="Início"
        className={cn.text}
      />
      <ValueDisplay
        value={dateTimeFormatter(vis.dataFim)}
        label="Fim"
        className={cn.text}
      />
    </div>
  )
}

Periodo.propTypes = {
  vis: PT.object,
}

const VisitaManage = ({ vis }) => {
  const navigate = useNavigate()
  const { dataInicio } = vis
  const { deleteVisita } = useDeleteVisita()

  const onDelete = () => deleteVisita(vis?.id)

  const onView = () => navigate(`/visitas/${vis?.id}`)

  const onEdit = () => navigate(`/visitas/${vis?.id}/alterar`)

  return (
    <ManageControls
      {...{ name: `visita de ${dataInicio}`, onDelete, onEdit, onView }}
    />
  )
}

VisitaManage.propTypes = {
  vis: PT.object.isRequired,
}
