import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import PT from 'prop-types'

const propTypes = {
  page: PT.number,
  setPage: PT.func,
  lastPage: PT.number,
}

const Pagination = ({ page: indexPage, setPage, lastPage }) => {
  const page = indexPage + 1
  const disablePrevious = page === 1
  const disableNext = page === lastPage

  const fullArr = Array.from({ length: lastPage }, (_, i) => i + 1)
  const arr = []
  const setArray = new Set()
  setArray.add(1)
  setArray.add(page)
  setArray.add(lastPage)
  for (let i = 1; setArray.size < 7 && i < 7; i++) {
    if (page - i > 1) setArray.add(page - i)
    if (page + i < lastPage) setArray.add(page + i)
  }
  setArray.forEach((v) => arr.push(v))

  const cn = {
    icon: 'h-7 w-7',
    iconDisabled: 'fill-slate-700',
    container: 'flex flex-row items-center gap-2 justify-center p-2',
    option: 'rounded-full w-7 h-7 flex items-center justify-center',
    optionEnabled: 'hover:bg-slate-700 cursor-pointer',
    optionSelected: 'bg-green-600',
  }

  return (
    <div className={cn.container}>
      <div
        className={`${cn.option} ${!disablePrevious && cn.optionEnabled}`}
        onClick={() => {
          if (!disablePrevious) setPage(indexPage - 1)
        }}
      >
        <ChevronLeftIcon
          className={`${cn.icon} ${disablePrevious && cn.iconDisabled}`}
        />
      </div>
      {fullArr.length > 7
        ? arr
            .sort((a, b) => a - b)
            .map((v, i, array) => (
              <>
                <div
                  key={i}
                  className={`${cn.option} ${
                    v === page ? cn.optionSelected : cn.optionEnabled
                  }`}
                  onClick={() => {
                    if (page !== v) setPage(v - 1)
                  }}
                >
                  {v}
                </div>
                {array[i + 1] !== v + 1 && v !== lastPage ? <div>...</div> : ''}
              </>
            ))
        : fullArr.map((v) => (
            <div
              key={v}
              className={`${cn.option} ${
                v === page ? cn.optionSelected : cn.optionEnabled
              }`}
              onClick={() => {
                if (page !== v) setPage(v - 1)
              }}
            >
              {v}
            </div>
          ))}
      <div
        className={`${cn.option} ${!disableNext && cn.optionEnabled}`}
        onClick={() => {
          if (!disableNext) setPage(indexPage + 1)
        }}
      >
        <ChevronRightIcon
          className={`${cn.icon} ${disableNext && cn.iconDisabled}`}
        />
      </div>
    </div>
  )
}

Pagination.propTypes = propTypes
export default Pagination
