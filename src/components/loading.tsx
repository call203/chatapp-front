import loadingImg from '../Assets/loading-gif.gif'
import { FC, PropsWithChildren } from 'react'

export const Loading: FC<PropsWithChildren> = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-full">
        <img src={loadingImg} className="w-10" />
      </div>
    </>
  )
}
