import loadingImg from '../Assets/loading-gif.gif'
import { FC, PropsWithChildren } from 'react'

export const Loading: FC<PropsWithChildren> = () => {
  return (
    <>
      <div className="items-center justify-center content-center flexw-full h-full">
        <img src={loadingImg} className="w-10" />
      </div>
    </>
  )
}
