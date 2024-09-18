import { FC, useEffect } from 'react'
import { MainButton } from '../MainButton'
import { useForm } from 'react-hook-form'
import {
  CreateConversationParams,
  RequestFriendParams,
} from '../../utils/types'
import { ErrorMessage } from '@hookform/error-message'
import { postRequestFriend } from '../../utils/api'
import { useToast } from '../../utils/hooks/useToast'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { createFriendRequestThunk } from '../../store/friendSlice'
type Props = {
  onClose: () => void
}
export const RequestFriendForm: FC<Props> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>({})
  const { success, error } = useToast()

  const dispatch = useDispatch<AppDispatch>()

  const onSubmit = (data: RequestFriendParams) => {
    dispatch(createFriendRequestThunk(data))
      .then(() => {
        success('send!')
        onClose()
      })
      .catch((err) => {
        let { response } = err
        error(response?.data?.message)
      })
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <div className="bg-b_131313 rounded-md py-4 px-5 mb-2">
          <div className="text-xsm mb-1 text-gray-200">Email</div>
          <input
            className="bg-inherit text-white text-sm w-full"
            style={{ border: 'none', outline: 'none' }}
            {...register('email', { required: 'Email is required' })}
          />
        </div>
        <div className="pb-5 text-my_orange">
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p>{message}</p>}
          />
        </div>
      </section>
      <MainButton>Send</MainButton>
    </form>
  )
}
