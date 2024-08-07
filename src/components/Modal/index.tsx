import React, { FC, PropsWithChildren } from 'react'

interface ModalContainerProps extends PropsWithChildren {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="font-bold text-xl mb-5">
      <div className="flex justify-between ">{children}</div>
    </div>
  )
}

export const ModalBody: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>
}

export const ModalContainer = React.forwardRef<
  HTMLDivElement,
  ModalContainerProps
>(({ children, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="fixed flex justify-center items-center w-full inset-0 h-screen bg-transparent bg-opacity-50"
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-b_1f1f1f  rounded-md py-3 px-5">
        {children}
      </div>
    </div>
  )
})
