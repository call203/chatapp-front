import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { friendsNavbarItems } from '../../utils/constants'
import { motion } from 'framer-motion'

interface Position {
  left: number
  width: number
  opacity: number
}
interface TabProps {
  name: string
  setPosition: Dispatch<SetStateAction<Position>>
  setNavId: Dispatch<SetStateAction<number>>
  index: number
}

interface FriendsPageNavBarProps {
  setNavId: Dispatch<SetStateAction<number>>
}

export const FriendsPageNavBar: React.FC<FriendsPageNavBarProps> = ({
  setNavId,
}) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const Tab: React.FC<TabProps> = ({ name, setPosition, setNavId, index }) => {
    const ref = useRef<HTMLLIElement | null>(null)

    return (
      <>
        <li
          ref={ref}
          onClick={() => {
            {
              if (!ref?.current) return
              setNavId(index)
              const { width } = ref.current.getBoundingClientRect()
              setPosition({
                left: ref.current.offsetLeft,
                width,
                opacity: 1,
              })
            }
          }}
          className={`flex-1 md:px-10 py-4 h-14 md:flex-none text-center ${
            index === 0 && position.opacity === 0
              ? 'border-my_blue border-b-4'
              : 'border-none border-transparent'
          }`}
          style={{ fontSize: 15 }}
        >
          {name}
        </li>
      </>
    )
  }

  const Cursor: React.FC<{ position: Position }> = ({ position }) => {
    return (
      <motion.li
        animate={{ ...position }}
        className="h-14 absolute border-b-4 border-my_blue"
      />
    )
  }

  return (
    <ul className="flex">
      {friendsNavbarItems.map((item, index) => {
        return (
          <Tab
            name={item.id}
            setPosition={setPosition}
            setNavId={setNavId}
            index={index}
          />
        )
      })}
      <Cursor position={position} />
    </ul>
  )
}
