import { Toaster } from 'react-hot-toast'

export const ToastViewport = () => {
  return (
    <Toaster
      position="top-right"
      gutter={15}
      containerStyle={{
        marginTop: 75,
        marginRight: 10,
      }}
      toastOptions={{
        duration: 3500,
        className: 'bg-gray-600 text-white',
      }}
    />
  )
}

export default ToastViewport
