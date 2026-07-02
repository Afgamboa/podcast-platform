import { Component, ReactNode } from 'react'
import ErrorAlert from '@components/ErrorAlert'

interface IErrorWrapperProps {
  children: ReactNode
}

interface IErrorWrapperState {
  hasError: boolean
}

class ErrorWrapper extends Component<IErrorWrapperProps, IErrorWrapperState> {
  state: IErrorWrapperState = { hasError: false }

  static getDerivedStateFromError(): IErrorWrapperState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[ErrorWrapper]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorAlert
          message="Something went wrong. Please refresh the page."
          onRetry={() => this.setState({ hasError: false })}
        />
      )
    }
    return this.props.children
  }
}

export default ErrorWrapper