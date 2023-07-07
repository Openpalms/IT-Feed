import { fireEvent, render, screen } from '@testing-library/react'
import { renderWithTranslation } from 'shared/lib/tests/renderWithTranslation/renderWithTranslation'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  test('renders without errors', () => {
    renderWithTranslation(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  test('toggles collapsed state on button click', () => {
    const { getByText, getByTestId } = render(<Sidebar />)
    const toggleButton = getByText('toggle')
    const sidebar = getByTestId('sidebar')

    expect(sidebar).not.toHaveClass('collapsed')

    fireEvent.click(toggleButton)

    expect(sidebar).toHaveClass('collapsed')

    fireEvent.click(toggleButton)

    expect(sidebar).not.toHaveClass('collapsed')
  })
})
