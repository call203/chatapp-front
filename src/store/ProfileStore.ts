//ZUSTAND

import { create } from "zustand";
import { User } from "../utils/types";

interface ProfileState {
  open: boolean;
  info: User | null;
  toggleProfile: () => void;
  setProfileInfo: (info: User) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  open: false,
  info: null,
  toggleProfile: () => set((state) => ({ open: !state.open })),
  setProfileInfo: (info) => set({ info })
}));

export default useProfileStore;

//REDUX
/*import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../utils/types'
import { create } from 'zustand'

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
export default profileSlice.reducer*/
