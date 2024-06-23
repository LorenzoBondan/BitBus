import {
  BanknotesIcon,
  CpuChipIcon,
  MapPinIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()

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
    {
      name: 'Pessoas',
      path: 'pessoas',
      Icon: UsersIcon,
    },
    {
      name: 'Categorias',
      path: 'categorias',
      Icon: RectangleGroupIcon,
    },
  ]

  const cn = {
    container: 'bg-slate-900 w-56 h-full py-2 text-[#eaeaea]',
    option: 'flex items-center gap-2 py-2 px-4 hover:bg-gray-400/10',
    optionActive: 'bg-white/10',
    icon: 'h-7 w-7 text-green-500',
    optionName: 'font-semibold',
  }

  return (
    <div className={cn.container}>
      {sidebarOptions.map((opt, i) => {
        const isOptionActive = location.pathname.indexOf(opt.path) === 1

        return (
          <Link key={i} to={opt.path}>
            <div
              key={i}
              className={`${cn.option} ${isOptionActive && cn.optionActive}`}
            >
              <opt.Icon className={cn.icon} />
              <h4 className={cn.optionName}>{opt.name}</h4>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
