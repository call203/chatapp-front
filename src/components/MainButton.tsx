import { FC, PropsWithChildren } from 'react'

export const MainButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <button
        type="submit"
        className="py-4 text-center bg-b_2b09ff w-full text-lg rounded-md font-semibold"
      >
        {children}
      </button>
    </>
  )
}
