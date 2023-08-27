import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/providers/StoreProvider'
import { useCallback, useMemo, useState } from 'react'
import { AsyncHook } from 'async_hooks'

interface hoverFuncs {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

type useHoveResult = [boolean, hoverFuncs]
export const useHover = (): useHoveResult => {
  const [isHovered, setIsHovered] = useState(false)
  const onMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [isHovered])
  const onMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [isHovered])
  return useMemo(() => [isHovered, { onMouseEnter, onMouseLeave }], [isHovered, onMouseEnter, onMouseLeave])
}
