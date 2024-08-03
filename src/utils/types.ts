export type CreateUserParams = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export type LoginParams = {
  email: string
  password: string
}

export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
}

export type ConversationType = {
  id: number
  creator: User
  recipient: User
  lastMessageSent?: lastMessageType
}

export type CreateConversationParams = {
  email: number
  message?: string
}

export type MessageType = {
  id: number
  content: string
  createdAt: string
  author: User
}

export type lastMessageType = {
  id: number
  content: string
  createdAt: string
}

export type MessageEventPayload = {
  message: MessageType
  conversation: ConversationType
}

export type ConversationLastMessageUpdate = {
  id: number
  content: string
}

export type MessageCreateParams = {
  conversationId: number
  content: string
}

export type ConversationCreateParams = {
  recipientId: number
  content?: string
}

export type ConversationMessagesType = {
  conversationId: number
  messages: MessageType[]
}
