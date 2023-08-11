import { getAuthDataState } from 'app/entities/User'
import { Suspense, memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader'

export const AppRouter = memo(() => {
  const isAuth = useSelector(getAuthDataState)
  const routes = useMemo(() => {
    return Object.values(routeConfig).filter((route) => (route.authOnly && !isAuth ? false : true))
  }, [isAuth])
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ element, path }) => (
          <Route key={path} path={path} element={<div className='page-wrapper'>{element}</div>} />
        ))}
      </Routes>
    </Suspense>
  )
})
