import PT from 'prop-types'
import TableTitle from '../forms/FormTitle'
import { useTable } from 'react-table'
import { omit } from 'ramda'

const classNamesShape = PT.shape({
  table: PT.string,
  thead: PT.string,
  theadTr: PT.string,
  theadTh: PT.string,
  tbody: PT.string,
  tbodyTr: PT.string,
  tbodyTd: PT.string,
})

const propTypes = {
  className: PT.string,
  classNames: classNamesShape,
  title: PT.string,
  columns: PT.arrayOf(PT.object),
  data: PT.arrayOf(PT.object),
}

const Table = (props) => {
  const {
    className = '',
    title,
    columns = [],
    data = [],
    classNames = {},
  } = props

  const cn = {
    root: `relative overflow-x-auto text-black ${className}`,
    table: `w-full text-sm text-center text-black ${classNames.table}`,
    thead: `text-sm border-b border-zinc-500 pb-8 ${classNames.thead}`,
    theadTr: `px-6 py-3  ${classNames.theadTr}`,
    theadTh: `w-24 ${classNames.theadTh}`,
    tbody: `${classNames.tbody}`,
    tbodyTr: `border-b border-zinc-500 ${classNames.tbodyTr}`,
    tbodyTd: `px-6 py-4 ${classNames.tbodyTd}`,
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <div className={cn.root}>
      {title && <TableTitle text={title} />}
      <table {...getTableProps()} className={cn.table}>
        <thead className={cn.thead}>
          {headerGroups.map((headerGroup, i) => (
            <tr
              key={i}
              {...omit(['key'], headerGroup.getHeaderGroupProps())}
              className={cn.thead}
            >
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  {...omit(['key'], column.getHeaderProps())}
                  className={cn.theadTh}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={cn.tbody}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                key={i}
                {...omit(['key'], row.getRowProps())}
                className={cn.tbodyTr}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      key={i}
                      {...omit(['key'], cell.getCellProps())}
                      className={cn.tbodyTd}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = propTypes
export default Table
