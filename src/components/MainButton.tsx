import { FC, PropsWithChildren } from 'react'

export const MainButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <button
        type="submit"
        className="py-3 text-center bg-my_blue w-full text-lg rounded-md font-semibold"
      >
        {children}
      </button>
    </>
  )
}
