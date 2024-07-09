import { Dispatch, SetStateAction, FC } from 'react'

type Props = {
  content: string
  setContent: Dispatch<SetStateAction<string>>
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void
}
export const MessageInputField: FC<Props> = ({
  content,
  setContent,
  sendMessage,
}) => {
  return (
    <form onSubmit={sendMessage} className="bg-b_131313 py-4 px-5 w-full ">
      <input
        className="bg-inherit text-white w-full text-sm"
        placeholder="Write to Anyone"
        style={{ border: 'none', outline: 'none' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></input>
    </form>
  )
}
