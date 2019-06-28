import React from 'react';
import { List, ListItem } from '@material-ui/core'
import { useCallback, useState, useMemo } from 'react';
import { History } from 'history';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  height: calc(100% - 56px); 
  overflow-y: overlay;
`;

const StyledList = styled(List)`
  padding: 0 !important; 
` as typeof List;

const StyledListItem = styled(ListItem)`
  height: 76px;
  padding: 0 15px; 
  display: flex; 
` as typeof ListItem;

const ChatPicture = styled.img`
  height: 50px; 
  width: 50px; 
  object-fit: cover; 
  border-radius: 50px;
`;

const ChatInfo = styled.div`
  width: calc(100% - 60px); 
  height: 46px; 
  padding: 15px 0; 
  margin-left: 10px;
  border-bottom: 0.5px solid silver;
  position: relative;
`;

const ChatName = styled.div`
  margin-top: 5px;
`;

const MessageContent = styled.div`
  color: grey;
  font-size: 15px; 
  margin-top: 5px; 
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const MessageDate = styled.div`
  position: absolute; 
  color: gray; 
  top: 20px;
  right: 0; 
  font-size: 13px;
`;

const getchatsQuery = `
  query GetChats {
    chats {
      id 
      name
      picture 
      lastMessage { 
        id 
        content 
        createdAt
      }
    }
  }
`;

interface ChatsListProps {
  history: History;
}

const ChatsList: React.FC<ChatsListProps> = ({ history }) => {
  const [chats, setChats] = useState<any[]>([]);
  useMemo(async () => {
    const body = await fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getchatsQuery }),
    });
    const {
      data: { chats },
    } = await body.json();
    setChats(chats)

  }, []);

  const navToChat = useCallback(
    chat => {
      history.push(`chat/${chat.id}`)
    },
    [history]
  );

  return (
    <Container>
      <StyledList>
        {chats.map(chat => (
          <StyledListItem key={chat.Id} data-testid="chat" button onClick={navToChat.bind(null, chat)}>
            <ChatPicture data-testid="picture" src={chat.picture} alt="profile" />
            <ChatInfo>
              <ChatName data-testid="name">
                {chat.name}
              </ChatName>
              {chat.lastMessage && (
                <React.Fragment>
                  <MessageContent data-testid="content">{chat.lastMessage.content}</MessageContent>
                  <MessageDate data-testid="date">
                    {moment(chat.lastMessage.createdAt).format('HH:mm')}
                  </MessageDate>
                </React.Fragment>
              )}
            </ChatInfo>
          </StyledListItem>
        ))}
      </StyledList>
    </Container>
  );
};

export default ChatsList