import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  children: ReactNode
  isLoading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#171410] text-white hover:bg-black',
  secondary: 'bg-[#f0ede7] text-[#262320] hover:bg-[#e5e0d8]',
  ghost: 'bg-transparent text-[#262320] hover:bg-[#e8e4dc]',
  danger: 'bg-[#ba2d2d] text-white hover:bg-[#9f2525]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-5 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    asChild = false,
    children,
    className,
    disabled = false,
    isLoading = false,
    size = 'md',
    type = 'button',
    variant = 'primary',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#262320]/40 disabled:cursor-not-allowed disabled:opacity-60',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error('Button with asChild=true expects a single valid React element child.')
    }

    const child = children as ReactElement<{ className?: string; 'aria-disabled'?: string }>

    return cloneElement(child, {
      className: cn(classes, child.props.className),
      'aria-disabled': isDisabled ? 'true' : undefined,
    })
  }

  return (
    <button ref={ref} className={classes} disabled={isDisabled} type={type} {...props}>
      {isLoading ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
          <span>Loading</span>
        </>
      ) : (
        children
      )}
    </button>
  )
})
