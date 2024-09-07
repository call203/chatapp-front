import {
  ConversationType,
  User,
  FriendRequest,
  FriendRequestDetailsType,
} from './types'

export const getRecipientFromConversation = (
  conversation?: ConversationType,
  user?: User,
) => {
  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator
}

export const getFriendRequestDetails = (
  { receiver, sender }: FriendRequest,
  user?: User,
): FriendRequestDetailsType =>
  user?.id === receiver?.id
    ? {
        status: 'Incoming Friend Request',
        user: sender,
        incoming: true,
      }
    : {
        status: 'Outgoing Friend Request',
        user: receiver,
        incoming: false,
      }
