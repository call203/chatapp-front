import { Dispatch, FC, SetStateAction } from 'react'
import { MainButton } from '../MainButton'
import { CreateConversationParams } from '../../utils/types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { useNavigate } from 'react-router-dom'
import { createConversationThunk } from '../../store/conversationSlice'

type Props = {
  setShowmodal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateConversationForm: FC<Props> = ({ setShowmodal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>({})
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onSubmit = (data: CreateConversationParams) => {
    dispatch(createConversationThunk(data))
      .unwrap()
      .then(({ data }) => {
        setShowmodal(false)
        navigate(`/conversations/${data.id}`)
      })
      .catch((err) => console.log(err))
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="bg-b_131313 rounded-md py-4 px-5 mb-2">
          <div className="text-sm mb-1 text-gray-200">Email</div>
          <input
            className="bg-inherit text-white text-bas w-full"
            style={{ border: 'none', outline: 'none' }}
            {...register('email', { required: 'Email is required' })}
          />
        </div>
      </section>
      <section>
        <div className="bg-b_131313 rounded-md w-full py-4 px-5 mb-2">
          <div className="text-sm mb-1 text-gray-200">Mesage (optional)</div>
          <input
            className="bg-inherit text-white w-full text-base"
            style={{ border: 'none', outline: 'none' }}
            {...register('message', { required: 'Message is required' })}
          />
        </div>
      </section>
      <MainButton>Create Conversation</MainButton>
    </form>
  )
}
