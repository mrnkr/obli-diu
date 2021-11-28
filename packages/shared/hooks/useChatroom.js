import { gql, useMutation, useQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import useErrorNotifier from './useErrorNotifier';
import useLoadingNotifier from './useLoadingNotifier';

const FETCH_ONCE = gql`
  query GetChatroomById($chatroomId: String!) {
    chatroom(id: $chatroomId) {
      id
      messages {
        id
        body
        pictureUrl
        sender
        createdAt
        updatedAt
      }
      lastMessage {
        id
        body
        sender
        createdAt
        updatedAt
      }
      users {
        id
        displayName
        email
      }
      isGroup
      lastActivity
      createdAt
      updatedAt
    }
  }
`;

const CHATROOM_SUBSCRIPTION = gql`
  subscription ChatroomUpdates($chatroomId: String) {
    chatroomUpdated(id: $chatroomId) {
      id
      lastMessage {
        id
        body
        sender
        createdAt
        updatedAt
      }
      users {
        id
        displayName
        email
      }
      isGroup
      lastActivity
      createdAt
      updatedAt
    }
  }
`;

const MSG_SUBSCRIPTION = gql`
  subscription NewMessage($chatroomId: String!) {
    messageReceived(id: $chatroomId) {
      id
      body
      pictureUrl
      sender
      createdAt
      updatedAt
    }
  }
`;

const LOG_LAST_ACTIVITY_MUTATION = gql`
  mutation LogLastActivity($input: LogLastActivityForUserDto!) {
    logLastActivityForUser(input: $input) {
      id
      lastActivity
    }
  }
`;

const SEND_MSG_MUTATION = gql`
  mutation SendMessage($input: SendMessageDto!) {
    sendMessage(input: $input) {
      id
      body
      pictureUrl
      sender
      createdAt
      updatedAt
    }
  }
`;

const ADD_PERSON_TO_GROUP = gql`
  mutation AddPersonToGroup($input: AddToChatroomDto!) {
    addUserToChatroom(input: $input) {
      id
    }
  }
`;

const defaultChatroom = {
  id: 'dummy',
  users: [],
  messages: [],
  lastMessage: null,
  isGroup: false,
  lastActivity: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const useChatroom = (chatroomId) => {
  const { loading, data, error, subscribeToMore, refetch } = useQuery(
    FETCH_ONCE,
    {
      variables: {
        chatroomId,
      },
    },
  );

  useLoadingNotifier(loading);
  useErrorNotifier(error);

  const [logLastActivityMutation] = useMutation(LOG_LAST_ACTIVITY_MUTATION);
  const [sendMsgMutation] = useMutation(SEND_MSG_MUTATION);
  const [addToChatroomMutation] = useMutation(ADD_PERSON_TO_GROUP);

  useEffect(() => {
    if (chatroomId) {
      refetch();
    }
  }, [chatroomId, refetch]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: CHATROOM_SUBSCRIPTION,
      variables: {
        chatroomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const updatedChatroom = subscriptionData.data.chatroomUpdated;

        return {
          ...prev,
          chatroom: {
            ...prev.chatroom,
            ...updatedChatroom,
          },
        };
      },
    });

    return unsubscribe;
  }, [chatroomId, subscribeToMore]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MSG_SUBSCRIPTION,
      variables: {
        chatroomId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageReceived;

        return {
          ...prev,
          chatroom: {
            ...prev.chatroom,
            messages: [...prev.chatroom.messages, newMessage],
          },
        };
      },
    });

    return unsubscribe;
  }, [chatroomId, subscribeToMore]);

  const notifyStartWriting = useCallback(async () => {
    await logLastActivityMutation({
      variables: {
        input: {
          chatroomId,
        },
      },
    });
  }, [chatroomId, logLastActivityMutation]);

  const sendMessage = useCallback(
    async (messageBody) => {
      await sendMsgMutation({
        variables: {
          input: {
            chatroomId,
            messageBody,
          },
        },
      });
    },
    [chatroomId, sendMsgMutation],
  );

  const sendPicture = useCallback(
    async (pictureUrl) => {
      await sendMsgMutation({
        variables: {
          input: {
            chatroomId,
            pictureUrl,
            messageBody: 'Picture 📷',
          },
        },
      });
    },
    [chatroomId, sendMsgMutation],
  );

  const addPersonToChatroom = useCallback(
    async (userId) => {
      await addToChatroomMutation({
        variables: {
          input: {
            userId,
            chatroomId,
          },
        },
      });
    },
    [addToChatroomMutation, chatroomId],
  );

  return {
    data: data?.chatroom ?? defaultChatroom,
    sendMessage,
    sendPicture,
    notifyStartWriting,
    addPersonToChatroom,
  };
};

export default useChatroom;
