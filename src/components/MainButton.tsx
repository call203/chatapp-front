import { FC, PropsWithChildren } from 'react'

interface MainButtonProps extends PropsWithChildren {
  className?: string
}

export const MainButton: FC<MainButtonProps> = ({ children, className }) => {
  return (
    <>
      <button
        type="submit"
        className={`py-3 text-center bg-my_blue w-full text-lg rounded-md font-semibold ${className}`}
      >
        {children}
      </button>
    </>
  )
}
