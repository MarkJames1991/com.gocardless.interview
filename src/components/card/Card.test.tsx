import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

describe('Card components', () => {
  it('renders composed card structure with expected data slots', () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
          <CardAction>Action</CardAction>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()

    expect(container.querySelector('[data-slot="card"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="card-header"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="card-title"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="card-description"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="card-action"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="card-content"]')).toBeInTheDocument()
    expect(container.querySelector('[data-slot="card-footer"]')).toBeInTheDocument()
  })

  it('merges custom className for each subcomponent', () => {
    const { container } = render(
      <Card className="card-extra">
        <CardHeader className="header-extra">
          <CardTitle className="title-extra">Title</CardTitle>
          <CardDescription className="description-extra">Description</CardDescription>
          <CardAction className="action-extra">Action</CardAction>
        </CardHeader>
        <CardContent className="content-extra">Body</CardContent>
        <CardFooter className="footer-extra">Footer</CardFooter>
      </Card>,
    )

    expect(container.querySelector('[data-slot="card"]')).toHaveClass('card-extra')
    expect(container.querySelector('[data-slot="card-header"]')).toHaveClass('header-extra')
    expect(container.querySelector('[data-slot="card-title"]')).toHaveClass('title-extra')
    expect(container.querySelector('[data-slot="card-description"]')).toHaveClass(
      'description-extra',
    )
    expect(container.querySelector('[data-slot="card-action"]')).toHaveClass('action-extra')
    expect(container.querySelector('[data-slot="card-content"]')).toHaveClass('content-extra')
    expect(container.querySelector('[data-slot="card-footer"]')).toHaveClass('footer-extra')
  })
})

