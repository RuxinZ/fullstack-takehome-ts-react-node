import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './App.css';
import Login from './components/Login';
import Editor from './components/Editor';
import WS_URL from './WS_URL';

const App = (): JSX.Element => {
  const checkUserEvent = (message: MessageEvent<any>): boolean => {
    const evnt = JSON.parse(message.data);
    return evnt.type === 'userevent';
  };

  const checkDocumentEvent = (message: any): boolean => {
    const evnt = JSON.parse(message.data);
    return evnt.type === 'contentchange';
  };

  const [username, setUsername] = useState('');

  const {
    sendJsonMessage,
    readyState,
  }: { sendJsonMessage: any; readyState: any } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (username && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username,
        type: 'userevent',
      });
    }
  }, [username, sendJsonMessage, readyState]);

  return (
    <div>
      {username ? (
        <Editor
          isUserEvent={checkUserEvent}
          isDocumentEvent={checkDocumentEvent}
        />
      ) : (
        <Login onLogin={setUsername} />
      )}
    </div>
  );
};

export default App;
