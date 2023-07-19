import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useEffect, useState } from 'react'
import { PageLoader } from 'widgets/PageLoader'
import { useTheme } from './providers/ThemeProvider'
import { AppRouter } from './providers/ThemeProvider/routers'
import { useDispatch } from 'react-redux'
import { userActions } from './entities/User/model/slice/UserSlice'

const App = () => {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])
  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
