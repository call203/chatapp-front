import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../utils/types'

interface ProfileState {
  open: boolean
  info: User | null
}

const initialState: ProfileState = {
  open: false,
  info: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleProfile: (state) => {
      state.open = !state.open
    },
    setProfileInfo: (state, action: PayloadAction<User>) => {
      state.info = action.payload
    },
  },
})

export const { toggleProfile, setProfileInfo } = profileSlice.actions
export default profileSlice.reducer
