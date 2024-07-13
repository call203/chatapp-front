import { createContext } from 'react'
import { io } from 'socket.io-client'
const { REACT_APP_WEBSOCKET_URL } = process.env

export const socket = io('http://localhost:3002')
export const SocketContext = createContext(socket)
