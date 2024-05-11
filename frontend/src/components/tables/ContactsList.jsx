import React, { useState } from 'react'
import PT from 'prop-types'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../utils/styleUtils'

//*****************************************************************************
// Interface
//*****************************************************************************

const contactShape = PT.shape({
  firstName: PT.string,
  lastName: PT.string,
  email: PT.string,
  contactTitle: PT.string,
})

const propTypes = {
  contacts: PT.arrayOf(contactShape),
  className: PT.string, // applied to root container
}

const defaultProps = {
  contacts: [],
  className: '',
}

//*****************************************************************************
// Components
//*****************************************************************************

const ContactsList = ({ contacts, className }) => {

  const [index, setIndex] = useState(0)

  const handleIconClick = increment => {
    let temp = index + increment
    if (temp < 0)
      temp += contacts.length
    else
      temp %= contacts.length
    setIndex(temp)
  }

  const cn = {
    root: `group flex items-center justify-center w-full ${className}`,
    infoContainer: 'flex flex-col items-start w-56',
    icon: 'w-6 h-6 mx-2 cursor-pointer invisible',
    arrowActive: 'group-hover:visible',
    contactName: 'font-semibold text-start whitespace-nowrap w-full truncate',
    contactInfo: 'text-start text-xs leading-3 w-full truncate',
  }

  const showContacts = contacts && contacts.length > 0
  const showArrows = contacts && contacts.length > 1

  return (
    <div className={cn.root}>
      {showContacts && (
        <>
          <ChevronLeftIcon className={classNames(cn.icon, showArrows && cn.arrowActive)} onClick={() => handleIconClick(-1)} />
          <div className={cn.infoContainer}>
            <div className={cn.contactName}>{`${contacts?.[index].firstName} ${contacts?.[index].lastName}`}</div>
            <div className={cn.contactInfo}>{contacts?.[index].contactTitle}</div>
            <div className={cn.contactInfo}>{contacts?.[index].email}</div>
          </div>
          <ChevronRightIcon className={classNames(cn.icon, showArrows && cn.arrowActive)} onClick={() => handleIconClick(-1)}/>
        </>
      )}
    </div>
  )
}

ContactsList.propTypes = propTypes
ContactsList.defaultProps = defaultProps

export default ContactsList
