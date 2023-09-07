import React, { MutableRefObject, ReactNode, UIEvent, useEffect, useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getScrollByPath, scrollActions } from 'features/ScrollRestoration'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollEnd?: () => void
}

export const Page: React.FC<PageProps> = ({ className, children, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const dispatch = useAppDispatch()
  const location = useLocation()
  const scrollPos = useSelector((state: StateSchema) => getScrollByPath(state, location.pathname))

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: () => onScrollEnd?.(),
  })

  const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
    dispatch(
      scrollActions.setScrollPos({
        pos: e.currentTarget.scrollTop,
        path: location.pathname,
      }),
    )
  }, 600)

  useEffect(() => {
    wrapperRef.current.scrollTop = scrollPos
  }, [])

  return (
    <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])} onScroll={onScroll}>
      {children}
      <div ref={triggerRef} />
    </section>
  )
}
