const Header = () => {
  const cn = {
    container: 'w-full h-14 bg-gray-800 text-[#eaeaea] flex items-center px-2',
    title: 'text-2xl font-semibold',
  }

  return (
    <div className={cn.container}>
      <h1 className={cn.title}>BITBUS</h1>
    </div>
  )
}

export default Header
