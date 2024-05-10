import {
  BanknotesIcon,
  CpuChipIcon,
  MapPinIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const sidebarOptions = [
    {
      name: 'Acervo',
      path: 'acervo',
      Icon: CpuChipIcon,
    },
    {
      name: 'Visitas',
      path: 'visitas',
      Icon: MapPinIcon,
    },
    {
      name: 'Oficinas',
      path: 'oficinas',
      Icon: UserGroupIcon,
    },
    {
      name: 'Doações',
      path: 'doacoes',
      Icon: BanknotesIcon,
    },
  ]

  const cn = {
    container: 'bg-slate-900 w-40 h-full py-2',
    option: 'flex items-center gap-2 p-2',
    icon: 'h-7 w-7',
    optionName: 'font-semibold',
  }

  return (
    <div className={cn.container}>
      {sidebarOptions.map((opt, i) => (
        // <Link key={i} to={opt.path}>
        <div key={i} className={cn.option}>
          <opt.Icon className={cn.icon} />
          <h4 className={cn.optionName}>{opt.name}</h4>
        </div>
        // </Link>
      ))}
    </div>
  )
}

export default Sidebar
