import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useState } from 'react'
import { PageLoader } from 'widgets/PageLoader'
import { useTheme } from './providers/ThemeProvider'
import { AppRouter } from './providers/ThemeProvider/routers'

const App = () => {
  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <button onClick={() => setIsOpen(true)}>test</button>
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
