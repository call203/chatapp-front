import axios, { AxiosRequestConfig } from 'axios'
import { CreateUserParams, LoginParams } from './types'
const { REACT_APP_API_URL } = process.env

const config: AxiosRequestConfig = { withCredentials: true }

export const postRegisterUser = (data: CreateUserParams) =>
  axios.post(`${REACT_APP_API_URL}/auth/register`, data, config)

export const postLoginUser = (data: LoginParams) =>
  axios.post(`${REACT_APP_API_URL}/auth/login`, data, config)

export const getAuthUser = () =>
  axios.get(`${REACT_APP_API_URL}/auth/status`, config)
