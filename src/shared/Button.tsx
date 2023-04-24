import React from 'react'

type ButtonProps = {
  children: React.PropsWithChildren<string>
  variant?: 'primary' | 'secondary'
  addClass?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  type = 'button',
  children = 'Click me!',
  addClass = '',
  disabled = false,
  onClick,
}) => {
  const defaultStyles =
    'w-full h-12 border-2 border-black shadow-[3px_3px_0px_0px_rgb(0,0,0)] rounded-md px-3 py-2'
  const variantStyles = {
    primary: 'text-white bg-indigo-500 hover:bg-indigo-400',
    secondary: 'text-black bg-white hover:bg-slate-200',
  }
  const disabledStyles =
    'bg-slate-200 hover:bg-slate-200 text-slate-700 cursor-not-allowed'
  const allStyles = `${defaultStyles} ${variantStyles[variant]} ${
    disabled && disabledStyles
  } ${addClass}`

  return (
    <button
      type={type}
      className={allStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button
