import { classNames } from 'shared/lib/classNames/classNames'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { Suspense, useEffect, useState } from 'react'
import { PageLoader } from 'widgets/PageLoader'
import { useTheme } from './providers/ThemeProvider'
import { AppRouter } from './providers/ThemeProvider/routers'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from './entities/User/model/slice/UserSlice'
import { getMounted } from './entities/User'

const App = () => {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const isMounted = useSelector(getMounted)
  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])
  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<PageLoader />}>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          {isMounted && <AppRouter />}
        </div>
      </Suspense>
    </div>
  )
}

export default App
