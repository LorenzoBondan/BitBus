import PT from 'prop-types'

const propTypes = {
  links: PT.arrayOf(PT.object),
}

const LinkList = ({ links = [] }) => {
  const cn = {
    container: '',
    title: 'text-slate-700 font-semibold',
    link: 'text-zinc-700 text-sm pl-2',
    linkTag: 'hover:text-zinc-900',
  }

  return (
    <div className={cn.container}>
      {links.length > 0 && (
        <>
          <div className={cn.title}>Links:</div>
          {links.map((link, i) => (
            <div className={cn.link} key={i}>
              -{' '}
              <a className={cn.linkTag} href={link.url}>
                {link.url}
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

LinkList.propTypes = propTypes
export default LinkList
