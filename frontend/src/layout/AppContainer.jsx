import ToastViewport from '../components/ui/Toast'
import AppRoutes from '../routes/AppRoutes'
import Header from './Header'
import Sidebar from './Sidebar'

const AppContainer = () => {
  const cn = {
    container: 'min-h-screen w-screen bg-slate-950 ',
    content: 'flex flex-row w-full h-[calc(100vh-3.5rem)] ',
    resource: 'w-[calc(100%-160px)] p-4 overflow-y-auto',
  }

  return (
    <div className={cn.container}>
      <Header />
      <div className={cn.content}>
        <Sidebar />
        <div className={cn.resource}>
          <AppRoutes />
        </div>
      </div>
      <ToastViewport />
    </div>
  )
}

export default AppContainer
