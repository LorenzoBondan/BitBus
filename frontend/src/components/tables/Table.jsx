import React from 'react'
import PT from 'prop-types'
import TableTitle from '../forms/FormTitle' // TODO: Generic or copy?
import { useTable } from 'react-table'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  className: PT.string, // applied to root container
  title: PT.string, // optional, only displayed if provided
  columns: PT.arrayOf(PT.object),
  data: PT.arrayOf(PT.object),
}

const defaultProps = {
  className: '',
  columns: [],
  data: [],
}

//*****************************************************************************
// Components
//*****************************************************************************

const Table = props => {

  const {
    className, title, columns, data
  } = props

  const cn = {
    root: `relative overflow-x-auto text-white ${className}`,
    table: 'w-full text-sm text-center text-white',
    thead: 'text-s border-b border-zinc-500 pb-8',
    theadTr: 'px-6 py-3',
    theadTh: 'w-24',
    tbody: '',
    tbodyTr: 'border-b border-zinc-500 opacity-70',
    tbodyTd: 'px-6 py-4',
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <div className={cn.root}>
      { title && <TableTitle text={title} /> }
      <table {...getTableProps()} className={cn.table}>
        <thead className={cn.thead}>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps() }  className={cn.thead}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={cn.theadTh}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={cn.tbody}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className={cn.tbodyTr}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className={cn.tbodyTd}>
                      {cell.render('Cell')}
                    </td>)
                })}
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = propTypes
Table.defaultProps = defaultProps
export default Table
