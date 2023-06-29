import React, { ErrorInfo, Suspense } from 'react'
import { PageError } from 'widgets/PageError'
import { PageLoader } from 'widgets/PageLoader'

interface ErrorBoundaryProps {
  children: React.ReactNode
}
interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log(error, info.componentStack)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback={<PageLoader />}>
          <PageError />
        </Suspense>
      )
    }

    return children
  }
}
