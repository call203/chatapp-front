import { useRef, useState } from 'react'
import { friendsNavbarItems } from '../../utils/constants'
import { motion } from 'framer-motion'

interface Position {
  left: number
  width: number
  opacity: number
}
interface TabProps {
  name: string
  setPosition: React.Dispatch<React.SetStateAction<Position>>
}

export const FriendsPageNaveBar = () => {
  const [focusedId, setFocusedId] = useState<Number>(0)

  const handleFocus = (id: number) => {
    setFocusedId(id)
  }
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const Tab: React.FC<TabProps> = ({ name, setPosition }) => {
    const ref = useRef<HTMLLIElement | null>(null)
    return (
      <li
        ref={ref}
        onClick={() => {
          {
            if (!ref?.current) return
            const { width } = ref.current.getBoundingClientRect()
            setPosition({
              left: ref.current.offsetLeft,
              width,
              opacity: 1,
            })
          }
        }}
        className="px-10 py-3"
        style={{ fontSize: 18 }}
      >
        {name}
      </li>
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
    <ul className="flex shadow-light_gray">
      {friendsNavbarItems.map((item, index) => {
        return <Tab name={item.id} setPosition={setPosition} />
      })}
      <Cursor position={position} />
    </ul>
  )
}
