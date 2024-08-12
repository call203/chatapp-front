import axios, { AxiosRequestConfig } from 'axios'
import {
  CreateConversationParams,
  CreateUserParams,
  LoginParams,
  MessageCreateParams,
} from './types'
const { REACT_APP_API_URL } = process.env

const config: AxiosRequestConfig = { withCredentials: true }

export const postRegisterUser = (data: CreateUserParams) =>
  axios.post(`${REACT_APP_API_URL}/auth/register`, data, config)

export const postLoginUser = (data: LoginParams) =>
  axios.post(`${REACT_APP_API_URL}/auth/login`, data, config)

export const postLogoutUser = () =>
  axios.post(`${REACT_APP_API_URL}/auth/logout`, {}, config)

export const getAuthUser = () =>
  axios.get(`${REACT_APP_API_URL}/auth/status`, config)

export const getConversations = () =>
  axios.get(`${REACT_APP_API_URL}/conversations`, config)

export const getConversationMessages = (id: number) =>
  axios.get(`${REACT_APP_API_URL}/messages/${id}`, config)

export const postNewMessage = (data: MessageCreateParams) =>
  axios.post(`${REACT_APP_API_URL}/messages`, data, config)

export const postNewConversation = (data: CreateConversationParams) =>
  axios.post(`${REACT_APP_API_URL}/conversations`, data, config)

export const patchUpdateProfile = (data: FormData) => {
  const customConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Additional headers here
    },
    withCredentials: true,
  }
  return axios.patch(`${REACT_APP_API_URL}/users/profiles`, data, customConfig)
}
